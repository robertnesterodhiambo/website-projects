$(document).ready(function() {
    $('#loginForm').submit(function(event) {
        event.preventDefault();
        
        let username = $('#username').val();
        let password = $('#password').val();
        
        $.ajax({
            type: 'POST',
            url: 'login.php', // Replace with your server-side script URL
            data: {
                username: username,
                password: password
            },
            success: function(response) {
                if (response.trim() === 'success') {
                    // Redirect to a welcome or dashboard page upon successful login
                    window.location.href = 'welcome.html';
                } else {
                    alert('Invalid username or password');
                }
            },
            error: function() {
                alert('Error occurred while processing your request');
            }
        });
    });
});
