import { Router } from "express";

const router = Router();

router.get("/health",(_req,res)=>{
    res.json({status:"OK",service:"backend is "});
})

 export default router;