const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Diary entries storage
let diaryEntries = [];

// Get entries
app.get("/entries", (req, res) => {
  res.json(diaryEntries);
});

// Add entry
app.post("/entries", (req, res) => {
  const entry = {
    text: req.body.text,
    timestamp: Date.now(),
  };
  diaryEntries.push(entry);
  res.json({ message: "Entry added", entry });
});

// Root route for testing
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Use Render’s assigned PORT
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
