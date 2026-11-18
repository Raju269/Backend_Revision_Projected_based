const express = require('express');
const app = express();

app.get('/add', (req, res) => {
    // THINK: Express automatically parses query strings.
    // GET /add?num1=10&num2=20 → req.query = { num1: '10', num2: '20' }
    
    const num1 = Number(req.query.num1);
    const num2 = Number(req.query.num2);
    // THINK: Query params are STRINGS. Convert to numbers.
    
    // THINK: Validate input. What if user sends /add?num1=abc?
    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: "Please provide valid numbers" });
    }
    
    res.json({ result: num1 + num2 });
});

app.listen(3000);