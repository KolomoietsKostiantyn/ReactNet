import { useParams } from "react-router-dom"
import { useProfile } from "../features/hooks/useProfile"

export default function ProfileHeader()
{
    const {id} = useParams();
    const {userdata} = useProfile(id as string);

    return(<>
        <div 
        style={{
            width:"100%",
            padding: "20px 40px",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            boxShadow:  "0px 4px 10px rgba(0,0,0,0.15)",
            position: "relative",
        zIndex: 1
        }}
        >
            <img src={userdata?.imageUrl ?? "/images/user.png"} style={{width:"110px", height:"110px", objectFit: "cover"}} alt="" />
            <span style={{marginLeft: "30px", fontSize: "24px", fontWeight: "bold" }}> {userdata?.displayName}</span>             
        </div>
    </>)
}