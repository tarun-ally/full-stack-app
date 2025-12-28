import express from "express";

const app = express();
const PORT = 5000;

app.get("/health", (_req, res) => {
  res.json({ status: "OK", service: "backend" });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
