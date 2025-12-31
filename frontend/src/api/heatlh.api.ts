import { http } from "../services/http"



export const getHealth = async()=>{
    const response = await http.get("/health");
   return response.data;
}