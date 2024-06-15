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

// Determine filter type
$filter = isset($_POST['filter']) ? $_POST['filter'] : 'best';

// Build SQL query based on filter
switch ($filter) {
    case 'best':
        $sql = "SELECT u.post_id, u.username, u.post, COALESCE(AVG(r.rating), 0) AS avg_rating 
                FROM userposts u 
                LEFT JOIN postrating r ON u.post_id = r.post_id 
                GROUP BY u.post_id, u.username, u.post 
                ORDER BY avg_rating DESC";
        break;
    case 'least':
        $sql = "SELECT u.post_id, u.username, u.post, COALESCE(AVG(r.rating), 0) AS avg_rating 
                FROM userposts u 
                LEFT JOIN postrating r ON u.post_id = r.post_id 
                GROUP BY u.post_id, u.username, u.post 
                ORDER BY avg_rating ASC";
        break;
    case 'random':
        $sql = "SELECT u.post_id, u.username, u.post, COALESCE(AVG(r.rating), 0) AS avg_rating 
                FROM userposts u 
                LEFT JOIN postrating r ON u.post_id = r.post_id 
                GROUP BY u.post_id, u.username, u.post 
                ORDER BY RAND()";
        break;
    default:
        $sql = "SELECT u.post_id, u.username, u.post, COALESCE(AVG(r.rating), 0) AS avg_rating 
                FROM userposts u 
                LEFT JOIN postrating r ON u.post_id = r.post_id 
                GROUP BY u.post_id, u.username, u.post 
                ORDER BY avg_rating DESC";
        break;
}

$result = $conn->query($sql);

// Close MySQL connection
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Post Performance</title>
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet">
<style>
    body {
        background-color: #f0f0f0; /* Light gray background */
    }
    .performance-container {
        max-width: 800px;
        margin: 50px auto;
        padding: 30px;
        background-color: #fff; /* White background */
        border-radius: 10px;
        box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
    }
    .performance-header {
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd; /* Light gray border bottom */
    }
    .performance-header h2 {
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
    .post-item .avg-rating {
        color: #ffc107; /* Gold color */
    }
    .filter-form {
        margin-bottom: 20px;
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

<div class="performance-container">
    <div class="performance-header">
        <h2>Post Performance</h2>
        <p>Logged in as: <?php echo htmlspecialchars($username); ?></p>
    </div>
    <form method="post" class="filter-form">
        <div class="form-group">
            <label for="filter">Sort posts by:</label>
            <select class="form-control" id="filter" name="filter" onchange="this.form.submit()">
                <option value="best" <?php if ($filter == 'best') echo 'selected'; ?>>Best Rated</option>
                <option value="least" <?php if ($filter == 'least') echo 'selected'; ?>>Least Rated</option>
                <option value="random" <?php if ($filter == 'random') echo 'selected'; ?>>Random</option>
            </select>
        </div>
    </form>
    <?php if ($result->num_rows > 0) { ?>
        <?php while($row = $result->fetch_assoc()) { ?>
            <div class="post-item">
                <h5>Posted by: <?php echo htmlspecialchars($row['username']); ?></h5>
                <p><?php echo htmlspecialchars($row['post']); ?></p>
                <p class="avg-rating">Average Rating: <?php echo number_format($row['avg_rating'], 2); ?> / 5</p>
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
