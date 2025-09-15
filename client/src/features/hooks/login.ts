import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./delayquery";
import type { LoginShema, User } from "../../lib/types";
import { useLocation } from "react-router-dom";



export default function Login()
{   
    const queryClient = useQueryClient();
    const apiClient = api;
    const location = useLocation();
    const loginHook = useMutation({
        mutationFn: async (a: LoginShema) => await apiClient.post("login?useCookies=true", a),
        onSuccess: async () =>  await queryClient.invalidateQueries({queryKey: ["User"]})
    })


    const userInfoHook = useQuery({
        queryKey: ["User"],
        queryFn: ()=> api.get<User>("account/user-info").then(r => r.data),
        staleTime: Infinity,
        enabled: location.pathname !=="/login"
        

    })

    const userLogout = useMutation({
        mutationFn: async ()=> await api.post("account/logout"),
        onSuccess: ()=> queryClient.removeQueries({queryKey:["User"]})
    });

    return {loginHook, userInfoHook, userLogout}
    
}
