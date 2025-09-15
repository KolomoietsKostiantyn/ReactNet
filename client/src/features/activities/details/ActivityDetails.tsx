import { useQuery } from "@tanstack/react-query";
import { ActivityContext } from "../../../app/layout/App";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useActivity } from "../../hooks/useActivity";
import { useNavigate, useParams } from "react-router-dom";



export default function ActivityDetails()
{    
    const val = useContext(ActivityContext);
    const {id} = useParams();
    const {data: currentActivity, isLoading} = useActivity(id);
    const navigate = useNavigate()




    return (
        <div>
            <img src={`/images/categoryImages/${currentActivity?.category}.jpg`}></img>
            <div>{currentActivity?.title}</div>
            <div>{currentActivity?.date}</div>
            <div>{currentActivity?.description}</div>
            <div>
                <button onClick={() => navigate(`/createActivity/${id}`)}>Edit</button>
                <button onClick={() => navigate(-1)}>Cansel</button>                
            </div>

        </div>

    )

}