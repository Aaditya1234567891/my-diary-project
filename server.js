const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Diary API
let diaryEntries = [];

app.get("/entries", (req, res) => {
  res.json(diaryEntries);
});

app.post("/entries", (req, res) => {
  const entry = {
    text: req.body.text,
    timestamp: Date.now(),
  };
  diaryEntries.push(entry);
  res.json({ message: "Entry added", entry });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
