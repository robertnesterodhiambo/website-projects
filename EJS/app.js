const express = require('express');
const axios = require('axios');
const ejs = require('ejs');
const path = require('path');

const app = express();
const port = 3000;

// Set the views directory to the current directory
app.set('views', path.join(__dirname));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define route to render the exam.ejs template
app.get('/', (req, res) => {
    res.render('exam');
});

// Define route to retrieve FDA food event data
app.get('/data', async (req, res) => {
    try {
        // Make GET request to FDA API
        const response = await axios.get('https://api.fda.gov/food/event.json?search=date_started:[20040101 TO 20160101]&limit=10');
        const data = response.data.results;

        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
