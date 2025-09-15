import { useContext } from "react";
import { ActivityContext } from "../../../app/layout/App";

export default function(){
const context = useContext(ActivityContext);

return context?.counter;
}