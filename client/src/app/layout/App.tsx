import React, { createContext,  useState } from "react"
import NavBar from "./NavBar";
import { Outlet, useLocation } from "react-router-dom";
import { useMutate } from "../../features/hooks/mutate";
import HomePage from "../../features/activities/dashboard/Home";
import mobXelement from "../../features/activities/dashboard/mobXelem";
import { ToastContainer } from "react-toastify";
import type { Activity } from "../../lib/types";
import Login from "../../features/hooks/login";
import FilterObserve from "../../features/observe/filterObserve";

type ActivityContextType = {
  selectActivityContext: (id: string) => void,

  EditFormVisibility: boolean,
  changeEditFormVisibility : (i: boolean)=> void
  modifyActivity: (activity: Activity) => Promise<boolean>,
  selectedActivityId: string | undefined,
  counter: mobXelement,
  filterObserve : FilterObserve
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

function App() {
  const[selectedActivityId, setselectedActivityId] = useState<string | undefined>(undefined);
  const[createActivityStatysVar, changeActivityVar] = useState<boolean>(false);

  const changeEditFormVisibility = (i:boolean) => changeActivityVar(i);
  const selectActivityContext = (id: string) => { if(id === null){ setselectedActivityId(undefined)}else{ setselectedActivityId(id)}};

  const EditFormVisibility = createActivityStatysVar;

  const {createMutation, updateMutation} = useMutate();

  const location = useLocation();

  const counter = new mobXelement();
  const filterObserve = new FilterObserve();
  const modifyActivity = (a: Activity) : Promise<boolean>=> {
    if (!a.id) return createMutation.mutateAsync(a).then(() => true).catch(() =>  false)
    else     return  updateMutation.mutateAsync(a).then(() => true).catch(() => false)
  }

  return (
<>   
   <ActivityContext.Provider value={{selectActivityContext,  changeEditFormVisibility, EditFormVisibility,  modifyActivity, selectedActivityId, counter, filterObserve}}>
    {location.pathname !== "/" && <NavBar />}

    <Outlet/>
    <ToastContainer/>
   </ActivityContext.Provider>    

</>
  )
}

export default App
export { ActivityContext };