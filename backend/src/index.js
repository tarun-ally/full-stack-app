const express = require("express");
const app = express();
app.get("/api/health", (req,res)=>{
    res.json({status:"Backend running  🚀"});
});

app.listen(5000,()=>{
    console.log("backend is running on port 5000");
    
});
