const express = require('express')
const app = express()

const compression = require("compression"); // Import compression middleware for response compression
const {
    ReadAllGroupLinksAll,
    addToDatabaseAPI,
} = require("./database");
// Use compression middleware to compress responses
app.use(compression());
app.use(express.json());

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// Your route handler for '/api/add'
app.post("/api/add", async (req, res) => {
    console.log("hi 1");
    try {
        data = req.body;

        const courseCode = String(data.courseCode).toUpperCase();
        const section = parseInt(data.section);
        const urls = String(data.url);
        console.log("hi 2");

        console.log(courseCode, section, urls);

        console.log(courseCode.toUpperCase());

        // Use the parameters passed to the function
        const result = await addToDatabaseAPI(courseCode, section, urls);
        res.status(200).json({ message: result });
    } catch (error) {
        console.log("hi error");

        console.error("Error:", error);
        res.status(500).json({ error: "Error updating link" });
    }
});

// API to get data for a specific course code
app.get("/api/courses/:courseCode", async (req, res) => {
    const courseCode = String(req.params.courseCode).toUpperCase();

    try {
        const data = await ReadAllGroupLinksAll(courseCode);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------





app.listen(process.env.PORT || 3000)