import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../../hooks/login";

export default function UserMenu()
{
    const [userDialogVisibility, setUserDialogVisibility] = useState<boolean>(false);
    const {userInfoHook, userLogout} = Login();
    const navigate = useNavigate();
    async function LogOut()
    {
       await userLogout.mutateAsync();
       setUserDialogVisibility(false);
        navigate("/login");
    }
    
    return(<> {userInfoHook.data ? <div style={{display:"inline-block", position:"relative", marginLeft:"auto", marginRight: "60px"}}><button onClick={()=> setUserDialogVisibility(!userDialogVisibility)}>{userInfoHook.data?.displayName}</button>
            {userDialogVisibility && <div style={{position:"absolute", zIndex:"100"}}>
                <div><Link to="/activityFormHook">CreateActivity</Link></div>
                <div><Link to={`/profiles/${userInfoHook.data.id}`}>My Profile</Link></div>
                <button onClick={()=> LogOut()}>Logout</button>
                </div >} 
    </div> : <Link to="/login" style={{margin:"auto",  marginRight: "60px"}}>Login </Link>}</>)

}