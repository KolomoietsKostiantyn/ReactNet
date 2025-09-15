import ActivityCard from "./ActivityCard"
import useActivities from "../../hooks/useActivities"
import { useContext, useEffect, useState } from "react"
import MyMap from "./MyMap"
import { useInView } from 'react-intersection-observer';
import { ActivityContext } from "../../../app/layout/App";
import { observer } from "mobx-react-lite";

 function ActivityListInner () {
  const val = useContext(ActivityContext);
  const { data, isLoading, isError, error, isFetching, fetchNextPage, isFetchingNextPage, hasNextPage } = 
      useActivities(3, val?.filterObserve.filter, val?.filterObserve.startDate)
  const [showMapById, setShowMapById] = useState<Record<string, boolean> >({})

  const {ref, inView } = useInView({
    threshold:0.5,
    triggerOnce: false    
  })

  useEffect(()=> {
    if(inView && hasNextPage)
    {
      fetchNextPage();
    }

  },
    [inView,hasNextPage, fetchNextPage]
  );

  if (isLoading) return <div>Загрузка…</div>
  if (isError)   return <div>Ошибка: {(error as Error).message}</div>

  const swithMap = (id:string) =>
  {
    
    setShowMapById(prexcxv => { return{...prexcxv, [id] : !prexcxv[id]}});
  }

  return (
    <div>
      {isFetching && <small>обновляю…</small>}
      <ul>
        {data?.map(x => (
          <li key={x.id} style={{ marginBottom: 10 }}>
            <ActivityCard activity={x} />

            
          {showMapById[x.id] && <MyMap latitude={x.latitude} longitude={x.longitude}/>}
          <button type="button" onClick={() => swithMap(x.id)}>{showMapById[x.id] ?"hide map": "show map"} </button>
          </li>
        ))}
          <div id="1111111111" ref={ref} style={{height:"1000px"}}></div>
      </ul>       
    </div>
  )
}

const ActivityList = observer(ActivityListInner);
export default ActivityList;