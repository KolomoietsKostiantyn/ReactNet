import { useContext, useEffect, useState } from "react"
import { ActivityContext } from "../../../app/layout/App"
import { useActivity } from "../../hooks/useActivity";
import { useNavigate, useParams,  } from "react-router-dom";
import type { Activity } from "../../../lib/types";


export default function ActivityForm() {
    const val = useContext(ActivityContext);
    
    const emptyActivity: Activity = {
        id: "",
        title: "",
        description: "",
        category: "",
        date: new Date().toISOString().slice(0, 16),    // для <input type="datetime-local" /> пустая строка — ок
        city: "",
        venue: ""
        };


        const navigate = useNavigate();

    const {id} = useParams();
    const { data, isLoading} = useActivity(id);

    const [currentData, setCurrentData] = useState<Activity>(emptyActivity);

    useEffect(()=> setCurrentData(data), []);

   if(isLoading)
    {
      return (<div>Loading...</div>)
    }   

    async function  save()
    {
        const res = await val?.modifyActivity(currentData);
        if(res)
        navigate(-1);
        

    }

    function handleChange(t: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>){
        const{name, value} = t.target;
        setCurrentData({...currentData, [name]: value});
    }

    function toDatetimeLocal(value: string): string{
        if (!value) return "";
        // Если приходит ISO "2025-03-01T12:30:00Z", обрежем до минут и уберём Z
        return value.replace("Z", "").slice(0, 16);
    }

    return (
    <div>
      <h1>{currentData?.id ? "Edit activity" : "Create activity"}</h1>

      <form
        //onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <label>
          Title
          <input
            name="title"
            value={currentData?.title}
            onChange={handleChange}
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={currentData?.description}
            onChange={handleChange}
          />
        </label>

        <label>
          Category
          <input
            name="category"
            value={currentData?.category}
            onChange={handleChange}
          />
        </label>

        <label>
          Date
          <input
            type="datetime-local"
            name="date"
            value={toDatetimeLocal(currentData?.date)}
            onChange={handleChange}

          />
        </label>

        <label>
          City
          <input
            name="city"
            value={currentData?.city}
            onChange={handleChange}
          />
        </label>

        <label>
          Venue
          <input
            name="venue"
            value={currentData?.venue}
            onChange={handleChange}
          />
        </label>

        <div style={{ display: "flex", justifyContent: "end", gap: "12px" }}>
          <button onClick={() => navigate(-1)} type="button">
            Cancel
          </button>
          <button onClick={save} type="button">Save</button>
        </div>
      </form>
    </div>
  );

}