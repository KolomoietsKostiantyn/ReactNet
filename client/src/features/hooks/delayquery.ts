import axios from "axios"
import { toast } from "react-toastify";

const api = axios.create(
    {baseURL: `${import.meta.env.VITE_API_URL}/api`,
        withCredentials: true
    }

);

api.interceptors.request.use(
    async (conf) => {
       // await new Promise(x => setTimeout(x, 1000));
        return conf
    }
)

api.interceptors.response.use(
 (respose)=> respose,
 (error) =>{
    if(error.status ===404)
    {toast(404)}
    if(error.status ===400)
        {toast(400)}
    Object.keys(error.response.data.errors).forEach((key) => {
        const errors: string[] = error.response.data.errors[key];
        errors.forEach((element )=> {
            toast(element)
        });

    })
 })

export default api;