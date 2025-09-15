import { Navigate, Outlet, useLocation } from "react-router-dom";
import Login from "../../hooks/login";

export default function AuthorizedPages()
{
    const {userInfoHook} = Login()
    const location = useLocation();

    if(userInfoHook.isPending) return(<></>);

    if(!userInfoHook.data) return(<Navigate to="/login" state={{from:location}}></Navigate>) 

    return(<><Outlet/></>)
}