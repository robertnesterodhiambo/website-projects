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

// Process form data
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $post_id = $_POST['post_id'];
    $rating = $_POST['rating'];

    // SQL query to insert rating (using prepared statements for security)
    $sql = "INSERT INTO userratings (post_id, username, rating) VALUES (?, ?, ?)";

    // Prepare and bind parameters
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("isi", $post_id, $username, $rating);

    // Execute query
    if ($stmt->execute()) {
        $response = array("success" => true, "message" => "Rating submitted successfully.");
    } else {
        $response = array("success" => false, "message" => "Error: " . $stmt->error);
    }

    // Close statement
    $stmt->close();
} else {
    $response = array("success" => false, "message" => "Invalid request method.");
}

// Close MySQL connection
$conn->close();

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>
