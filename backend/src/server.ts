import app from "./app";
import { startEventWorker } from "./workers/event.worker";

const PORT =  5000;
app.listen(PORT,()=>{
    console.log(`🚀 Backend running on port ${PORT}`);
     startEventWorker();
})