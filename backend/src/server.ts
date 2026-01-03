import app from "./app";
import { startEventWorker } from "./workers/event.worker";
// import "./workers/event.worker";

const PORT =  5000;
app.listen(PORT,"0.0.0.0",()=>{
    console.log(`🚀  API Backend server running on port ${PORT}`);
 
})