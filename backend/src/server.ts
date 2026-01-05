import app from "./app";

const PORT =  5000;
app.listen(PORT,"0.0.0.0",()=>{
    console.log(`🚀  API Backend server running on port ${PORT}`);
})