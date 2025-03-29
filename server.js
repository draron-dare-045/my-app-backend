const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 


app.get("/", (req, res) => {
    res.send("Aviation News API is running . Use /api/news to get news.");
});


app.get("/api/news", async (req, res) => {
    const query = req.query.q || "aviation"; 
    const API_KEY = process.env.NEWS_API_KEY;   
    const API_URL = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&apiKey=${API_KEY}`;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch news" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
