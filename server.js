const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Temporary in-memory storage
let diaryEntries = [];

// Get all entries
app.get("/entries", (req, res) => {
  res.json(diaryEntries);
});

// Add a new entry
app.post("/entries", (req, res) => {
  const entry = {
    text: req.body.text,
    timestamp: Date.now(),
  };
  diaryEntries.push(entry);
  res.json({ message: "Entry added", entry });
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
