import type { Activity } from "../lib/types";
import AtendersMini from "./AtendersMini";

type Props ={
    activity: Activity
}

export default function ActivityAtenders({activity} : Props)
{


    return(<>
        {activity.attendees.map((x, index)=> <AtendersMini key={index} userInfo = {x}/>)}
    </>)

}