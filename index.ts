import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import { approvePiPayment, completePiPayment } from "./pi";

const app = express();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Backend running on", PORT));
app.get("/health", (_req, res) => {
  res.status(200).send("ok");
});

app.get("/", (_req, res) => {
  res.send("backend up");
})
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

app.get("/", (req, res) => res.send("PiMaze backend runing"));

app.post("/pi/payments/approve", async (req, res) => {
  try {
    const { paymentId } = req.body;
    if (!paymentId) return res.status(400).json({ error: "paymentId missing" });

    await approvePiPayment(paymentId);
    return res.json({ ok: true });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || String(e) });
  }
});

app.post("/pi/payments/complete", async (req, res) => {
  try {
    const { paymentId, txid } = req.body;
    if (!paymentId || !txid) return res.status(400).json({ error: "paymentId/txid missing" });

    await completePiPayment(paymentId, txid);
    return res.json({ ok: true });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || String(e) });
  }
});

const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`Backend running on ${port}`));