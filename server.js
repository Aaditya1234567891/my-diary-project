const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB URI
const mongoURI = process.env.MONGODB_URI || "mongodb+srv://aaditya:AIR53491@cluster0.7lso84o.mongodb.net/diaryDB?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Schema
const entrySchema = new mongoose.Schema({
  text: String,
  timestamp: { type: Date, default: Date.now }
});

const Entry = mongoose.model("Entry", entrySchema);

// GET all entries
app.get("/entries", async (req, res) => {
  try {
    const entries = await Entry.find({});
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new entry
app.post("/entries", async (req, res) => {
  try {
    const entry = new Entry({ text: req.body.text });
    await entry.save();
    res.json({ message: "Entry added", entry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
