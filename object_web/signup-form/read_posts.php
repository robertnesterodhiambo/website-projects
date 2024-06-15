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

// Handle rating submission
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['rating'], $_POST['post_id'])) {
    $post_id = $_POST['post_id'];
    $rating = $_POST['rating'];
    
    // SQL query to insert or update rating (using prepared statements for security)
    $sql = "INSERT INTO postrating (post_id, username, rating) VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE rating=?";
    
    // Prepare and bind parameters
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("isis", $post_id, $username, $rating, $rating);
    
    // Execute query
    if ($stmt->execute()) {
        $message = "Rating submitted successfully.";
    } else {
        $message = "Error: " . $stmt->error;
    }
    
    // Close statement
    $stmt->close();
}

// Fetch all posts
$sql = "SELECT post_id, username, post FROM userposts";
$result = $conn->query($sql);

// Close MySQL connection
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Read Posts</title>
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet">
<style>
    body {
        background-color: #f0f0f0; /* Light gray background */
    }
    .posts-container {
        max-width: 800px;
        margin: 50px auto;
        padding: 30px;
        background-color: #fff; /* White background */
        border-radius: 10px;
        box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
    }
    .posts-header {
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd; /* Light gray border bottom */
    }
    .posts-header h2 {
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
    .post-item {
        margin-bottom: 20px;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
        background-color: #f8f9fa; /* Light gray background */
    }
    .post-item h5 {
        color: #343a40; /* Dark color */
    }
    .post-item p {
        color: #6c757d; /* Gray color */
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
            <li class="nav-item">
                <a class="nav-link" href="post_performance.php">Post Performance</a>
            </li>
        </ul>
        <form class="form-inline my-2 my-lg-0" action="logout.php" method="post">
            <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Logout</button>
        </form>
    </div>
</nav>

<div class="posts-container">
    <div class="posts-header">
        <h2>Read Posts</h2>
    </div>
    <?php if (isset($message)) { ?>
        <div class="alert alert-info" role="alert">
            <?php echo $message; ?>
        </div>
    <?php } ?>
    <?php if ($result->num_rows > 0) { ?>
        <?php while($row = $result->fetch_assoc()) { ?>
            <div class="post-item">
                <h5>Posted by: <?php echo htmlspecialchars($row['username']); ?></h5>
                <p><?php echo htmlspecialchars($row['post']); ?></p>
                <form method="post" action="read_posts.php">
                    <div class="form-group">
                        <label for="rating_<?php echo $row['post_id']; ?>">Rate this post:</label>
                        <select class="form-control" id="rating_<?php echo $row['post_id']; ?>" name="rating" required>
                            <option value="">Select a rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <input type="hidden" name="post_id" value="<?php echo $row['post_id']; ?>">
                    <button type="submit" class="btn btn-primary">Submit Rating</button>
                </form>
            </div>
        <?php } ?>
    <?php } else { ?>
        <div class="alert alert-info" role="alert">
            No posts available.
        </div>
    <?php } ?>
</div>

<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
</body>
</html>
