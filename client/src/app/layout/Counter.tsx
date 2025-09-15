import getCounter from "../../features/activities/dashboard/getCounter"
import {Observer} from "mobx-react-lite"

export default function Counter()
{
    const counter = getCounter();
    return(
    <Observer>
        {() =>(
<>
{counter.count}
    <button onClick={() => counter?.increment()}>increment</button>
        <button onClick={() =>counter?.decrement()}>decrement</button>
            <div>
                total count {counter?.totalLenth}
            </div>
        <ul>
            {
               counter?.action.map((x, y) =>
                    <li key={y}>{x}</li>                
               )
            }
        </ul>
</>
        )}    
    </Observer>)

}