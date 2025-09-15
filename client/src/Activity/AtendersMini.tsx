import { useState } from "react"
import type { UserCard } from "../lib/types"
import { Link } from "react-router-dom";

type Props={
    userInfo: UserCard
}

export default function AtendersMini({userInfo} : Props)
{
    const [showUserDetails, swichShowUserDetails] = useState<boolean>(false);
    function mouseOn()
    {
        
        swichShowUserDetails(true);
    }

    function mouseOut()
    {
        
        swichShowUserDetails(false);
    }

    return(<div style={{display:"inline-flex", position:"relative"}} onMouseLeave={mouseOut} onMouseOver={mouseOn}>
        <img src={userInfo.imageUrl ?? "/images/user.png"}   style={{width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", }}></img>
       { showUserDetails && <div style={{position:"absolute", top:"10px", left:"20px", zIndex:"1000",  background: "white"}} >
            <div >
                <img src={userInfo.imageUrl ?? "/images/user.png"} style={{width: "110px", height: "110px", objectFit: "cover" }}></img>
            </div>
            <div>{userInfo.displayName}</div>
            <Link to={`/profiles/${userInfo.id}`}>go to visitor page</Link>
            <div>20 followers</div>
        </div>}
    </div>)

}