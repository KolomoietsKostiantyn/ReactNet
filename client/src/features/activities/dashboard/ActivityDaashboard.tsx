import React, { useContext, useState } from "react"
import ActivityList from "./ActivityList"

import { ActivityContext } from "../../../app/layout/App";

import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { observer } from "mobx-react-lite";


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function ActivityDaashboardInner()
{
const val = useContext(ActivityContext);
const [value, onChange] = useState<Value>(new Date())

return(
    <div className="container" style={{display: "flex"}}>
        <div className="grid" style={{flex: "0 0 50%"}}>
            <ActivityList/>
        </div>
        <div style={{display: "1"}}>
            <div>
                <button onClick={() => val?.filterObserve.setFilter("All")}>All</button><br/>
                <button onClick={() => val?.filterObserve.setFilter("going")}>I'm going</button><br/>
                <button onClick={() => val?.filterObserve.setFilter("hosting")}>I'm hosting</button><br/>
            </div>
            <div>
                <Calendar  onChange={(data) => {   onChange(data); val?.filterObserve.setDate(data)}} value={value} />
            </div>
        </div>

    </div>
)
}

const ActivityDashboard  = observer(ActivityDaashboardInner);
export default ActivityDashboard;