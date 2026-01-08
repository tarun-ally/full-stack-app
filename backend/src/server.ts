import app from "./app";
import { redisClient } from "./redis/connection";

const PORT =  5000;

async function start(){
//     if(!redisClient.isOpen){
//    await redisClient.connect();
//     console.log("🟢 Redis client connected");
//     }
 
    
app.listen(PORT,"0.0.0.0",()=>{
    console.log(`🚀  API Backend server running on port ${PORT}`);
})
}
start()