import express from "express";
import routes from "./routes";

import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const FrontendURL = process.env.FRONTEND_url ||"*";

// 

app.use(cors({
    origin:FrontendURL,
    credentials:true,
}))
app.use(express.json());
app.use("/api",routes);

export default app;



