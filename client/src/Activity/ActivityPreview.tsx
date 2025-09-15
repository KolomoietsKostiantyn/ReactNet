import { useState } from "react"
import MyMap from "../features/activities/dashboard/MyMap";
import { useActivity } from "../features/hooks/useActivity";
import { useNavigate, useParams } from "react-router-dom";
import Login from "../features/hooks/login";
import { useMutate } from "../features/hooks/mutate";
import { ChatComponent } from "../features/components/chat/ChatComponent";


export default function ActivityPreview(){

    const [showMap, swithchShowMap] = useState<boolean>(false);
    const{id} = useParams();
    const {data, isPending} = useActivity(id);
    const {userInfoHook} = Login();
    const navigate = useNavigate();
    const {switchActivityStatys, subscribeUnsubscribe} = useMutate();
    const isSubscribed = data?.attendees?.some(x => x.id ===userInfoHook.data.id)


 if (isPending) return (<div>Загрузка…</div>)
 
    

    return(
    <>
    <div style={{display: "flex"}}>
        <div style={{flex:1, background: "lightblue"}}>
            <div style={{ position: "relative", width: "100%", maxWidth: "600px" }}>
  <img
    src={`/images/categoryImages/${data.category}.jpg`}
    alt="activity"
    style={{
      width: "100%",
      height: "250px",
      objectFit: "cover", // всегда одинаковая высота, картинка обрезается
      borderRadius: "8px"
    }}
  />

  {userInfoHook.data.id === data.hostId && (
    <button
      onClick={() => navigate(`/activityFormHook/${data.id}`)}
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        padding: "6px 12px",
        background: "rgba(255,255,255,0.8)",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "pointer"
      }}
    >
      Edit
    </button>
  )}

  {userInfoHook.data.id === data.hostId && (
    <button
      onClick={() => switchActivityStatys.mutate(data.id)}
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        padding: "6px 12px",
        background: data.isCancelled ? "green" : "red",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
      }}
    >
      {data.isCancelled ? "Activate" : "Cancel"}
    </button>
  )}

  {userInfoHook.data.id !== data.hostId && !userInfoHook.data.isCancelled && (
    <button
      onClick={() => subscribeUnsubscribe.mutate(data.id)}
      style={{
        position: "absolute",
        bottom: "10px",
        right: "10px",
        padding: "6px 12px",
        background: "dodgerblue",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
      }}
    >
      {isSubscribed ? "Unsubscribe" : "Subscribe"}
    </button>
  )}
</div>
           
            <div>{data.title}</div>
            <div>{data.date}</div>
            <div>{`${data.city} ${data.venue}`}</div>
            <div>{`${data.description}`}</div>
            <button onClick={()=>swithchShowMap(!showMap)}>show map</button>
            {showMap && <MyMap latitude={data.latitude} longitude={data.longitude}/>}
        </div>
         <div style={{display: "lightgreen"}}>
            <div> {data?.attendees?.length} people going</div>
            {data?.attendees?.map(x => 
            <div style={{display:"flex"}}>
                <div><img src={x.imageUrl ?? "/images/user.png"} style={{width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover"}}></img></div>
                <div>{x.displayName}</div>
                <div>{x.ishost && "   Host"}</div>
            </div>)}
         </div>         
    </div>
     <ChatComponent activityId={id}/>
    </>)
}