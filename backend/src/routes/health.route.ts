import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
    res.json({
        status: "OK",
        service: "Event Processing API",
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    });
});

export default router;