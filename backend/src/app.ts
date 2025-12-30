import express from "express";
import healthRoute from "./routes/health.route";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use("/health",healthRoute);


export default app;



