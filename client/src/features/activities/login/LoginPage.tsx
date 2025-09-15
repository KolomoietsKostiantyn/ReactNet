import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import ActivityFormHookTextInput from "../dashboard/ActivityFormHookTextInput";
import Login from "../../hooks/login";
import { loginShema, type LoginShema } from "../../../lib/types";
import { Navigate, useLocation } from "react-router";


export default function LoginPage()
{
    const location = useLocation();

    const {loginHook, userInfoHook} = Login();
    const {control, handleSubmit} = useForm<LoginShema>({
        resolver: zodResolver(loginShema)
     });

     async function onSubmit(a: LoginShema){
        
        await loginHook.mutateAsync(a);
     }

     if(loginHook.isSuccess || userInfoHook.data) return(<Navigate to={location.state?.from?.pathname || "/"}/>)



    return(<form onSubmit={handleSubmit(onSubmit)}> 
        <ActivityFormHookTextInput
            control={control}
            name="email"
        />
        <ActivityFormHookTextInput
            control={control}
            name="password"
        />
        <input type="submit" value="LOGIN"/>
    </form>)
}