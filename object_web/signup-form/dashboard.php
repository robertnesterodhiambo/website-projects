<?php
session_start();

// Check if user is logged in
if (!isset($_SESSION['username'])) {
    // Redirect to login page if not logged in
    header("Location: login.php");
    exit();
}

// Get username from session
$username = $_SESSION['username'];

// Database configuration
$host = 'localhost';
$db_username = 'root';
$db_password = '1234';
$database = 'web';

// Connect to MySQL
$conn = new mysqli($host, $db_username, $db_password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle post submission
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['post_content'])) {
    $post_content = $_POST['post_content'];
    
    // SQL query to insert post (using prepared statements for security)
    $sql = "INSERT INTO userposts (username, post) VALUES (?, ?)";
    
    // Prepare and bind parameters
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username, $post_content);
    
    // Execute query
    if ($stmt->execute()) {
        $message = "Post submitted successfully.";
    } else {
        $message = "Error: " . $stmt->error;
    }
    
    // Close statement
    $stmt->close();
}

// Close MySQL connection
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dashboard</title>
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet">
<style>
    body {
        background-color: #f0f0f0; /* Light gray background */
    }
    .dashboard-container {
        max-width: 800px;
        margin: 50px auto;
        padding: 30px;
        background-color: #fff; /* White background */
        border-radius: 10px;
        box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
    }
    .dashboard-header {
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd; /* Light gray border bottom */
    }
    .dashboard-header h2 {
        color: #007bff; /* Blue color */
    }
    .navbar {
        margin-bottom: 20px;
        border-radius: 5px;
        box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1);
    }
    .navbar-nav .nav-link {
        color: #007bff; /* Blue color */
    }
    .navbar-nav .nav-link:hover {
        color: #0056b3; /* Darker blue on hover */
    }
    .form-group textarea {
        resize: none;
    }
    .alert {
        margin-top: 20px;
    }
</style>
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="dashboard.php">Dashboard</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <a class="nav-link" href="dashboard.php">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="read_posts.php">Read Posts</a>
            </li>
        </ul>
        <form class="form-inline my-2 my-lg-0" action="logout.php" method="post">
            <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Logout</button>
        </form>
    </div>
</nav>

<div class="dashboard-container">
    <div class="dashboard-header">
        <h2>Welcome, <?php echo htmlspecialchars($username); ?>!</h2>
    </div>
    <?php if (isset($message)) { ?>
        <div class="alert alert-info" role="alert">
            <?php echo $message; ?>
        </div>
    <?php } ?>
    <div class="dashboard-content">
        <form method="post" action="dashboard.php">
            <div class="form-group">
                <label for="post_content">What's on your mind?</label>
                <textarea class="form-control" id="post_content" name="post_content" rows="4" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Post</button>
        </form>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
</body>
</html>
