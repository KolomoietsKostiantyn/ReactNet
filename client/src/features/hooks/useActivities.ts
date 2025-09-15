import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import api from "./delayquery";
import type { Activity, ActivityCursor, ActivityInfinite, ActivityWithFlags, getActivityParam } from "../../lib/types";
import { number } from "zod";
import Login from "./login";
import { useContext } from "react";
import { ActivityContext } from "../../app/layout/App";

export default function useActivities(
        pageSize: number,
        filter: string,
        startDateISO: string
) {
    const context = useContext(ActivityContext);
     const delay = api;
          const {userInfoHook} = Login();
    return useInfiniteQuery<ActivityInfinite, Error, ActivityWithFlags[], ['activities', number], ActivityCursor | undefined>({        
        queryKey:['activities', pageSize,   filter, startDateISO ],
        queryFn: async ({pageParam, signal} ) => 
        {
            
           const res  =  await delay.get<ActivityInfinite>('/Activities',            
            {   
                params:{
                    ...pageParam,
                    pageSize,
                    filter: filter,
                    startDate: startDateISO
                },signal
            })

            return res.data
        },
        initialPageParam: undefined,
        getNextPageParam: lastPage => lastPage.nextCursors?? null
            
           ,
        select: data =>  data.pages.flatMap(x => x.items).map(x =>{
            const currentUserId = userInfoHook.data?.id;
            const activityHost = x.attendees.find(i => i.ishost);
            const isGoing = x.attendees.some(i => i.id === currentUserId );
            return{
                ...x,
                isHost: activityHost?.id === currentUserId,
                isGoing: isGoing,
                hostImage: activityHost?.imageUrl                
            }

        })
    });  

}