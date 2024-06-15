<?php
session_start();

// Database connection details
$servername = "localhost";
$username = "root";
$password = "1234";
$dbname = "web";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch username and password from POST request
$username = $_POST['username'];
$password = $_POST['password'];

// Sanitize inputs (prevent SQL injection)
$username = mysqli_real_escape_string($conn, $username);

// Query to fetch user details
$sql = "SELECT * FROM user WHERE username='$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // User found
    $user = $result->fetch_assoc();
    
    // Verify password using password_verify()
    if (password_verify($password, $user['password'])) {
        // Password correct, set session variables
        $_SESSION['username'] = $user['username'];
        
        // Redirect to dashboard page
        echo json_encode(array("success" => true));
    } else {
        // Password incorrect
        echo json_encode(array("success" => false, "message" => "Invalid password."));
    }
} else {
    // User not found
    echo json_encode(array("success" => false, "message" => "User not found."));
}

$conn->close();
?>
