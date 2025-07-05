const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 1900;

app.use(cors());

app.get("/execution", async (req, res) => {
  const { target, mode, username, key } = req.query;

  try {
    const { data } = await axios.get("http://209.38.82.131:1900/execution", {
      params: { target, mode, username, key },
      timeout: 5000 // tambahkan timeout agar tidak gantung lama
    });
    res.json(data);
  } catch (err) {
    console.error("Gagal proxy ke API utama:", err.message);
    res.status(500).json({ error: "❌ Gagal proxy ke API utama", detail: err.message });
  }
});

app.listen(port, () => {
  console.log(`✅ Proxy aktif di http://localhost:${port}`);
});