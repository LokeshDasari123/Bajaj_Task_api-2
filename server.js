const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// File storage
const upload = multer();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// POST /bfhl - Handle JSON Input and File
app.post('/bfhl', upload.single('file'), (req, res) => {
    const { data, file_b64 } = req.body;

    const user_id = 'john_doe_17091999';  // Replace with logic to generate user_id dynamically
    const email = 'john@xyz.com';         // Hardcoded email
    const roll_number = 'ABCD123';        // Hardcoded roll number
    let numbers = [], alphabets = [], highestLower = [];

    if (data && Array.isArray(data)) {
        // Separate numbers and alphabets
        numbers = data.filter(item => !isNaN(item));
        alphabets = data.filter(item => isNaN(item));

        // Find highest lowercase alphabet
        const lowerCaseAlphabets = alphabets.filter(ch => ch >= 'a' && ch <= 'z');
        if (lowerCaseAlphabets.length > 0) {
            highestLower = [lowerCaseAlphabets.sort().pop()];
        }
    }

    // Handle File
    let file_valid = false;
    let file_mime_type = '';
    let file_size_kb = 0;

    if (file_b64) {
        const buffer = Buffer.from(file_b64, 'base64');
        file_valid = true;
        file_mime_type = 'image/png'; // Replace with actual MIME type
        file_size_kb = (buffer.length / 1024).toFixed(2); // File size in KB
    }

    // Response
    res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLower,
        file_valid,
        file_mime_type,
        file_size_kb
    });
});

// GET /bfhl - Returns operation code
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
