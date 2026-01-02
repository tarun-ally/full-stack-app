import { Router } from "express";
import healthRouter from './health.route';
import eventRouter from './event.route'
const router = Router();

router.use("/health",healthRouter);
router.use("/events",eventRouter);

export default router;