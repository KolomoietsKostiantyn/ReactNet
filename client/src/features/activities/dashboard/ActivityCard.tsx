import { useContext } from "react"
import { ActivityContext } from "../../../app/layout/App"
import { Link } from "react-router-dom";
import { format  } from "date-fns";
import type { Activity } from "../../../lib/types";
import ActivityAtenders from "../../../Activity/ActivityAtenders";

type Prop={
    activity: Activity
}

export default function ActivityCard({activity}: Prop){

    //const val = useContext(ActivityContext);

    return (
        <>
            <div>
                <span>{activity.title}</span> <br/>
                <span>  {format( activity.date, "dd-MM-yyyy HH:mm:ss")}</span><br/>
                <span>{activity.description}</span><br/>
                <span>{activity.city}</span><br/>
                <span>{activity.category}</span><br/>
               
                <ActivityAtenders activity={activity}/><br/>
                
                <span ><Link to={`/activityPreview/${activity.id}`}>view</Link></span>
                
            </div>  
        </>
    )
}