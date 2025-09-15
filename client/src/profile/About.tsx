import { useParams } from "react-router-dom";
import Login from "../features/hooks/login"
import { useProfile } from "../features/hooks/useProfile";
import { useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ActivityFormHookTextInput from "../features/activities/dashboard/ActivityFormHookTextInput";
import ActivityFormHookTextAreaInput from "../features/activities/dashboard/ActivityFormHookTextAreaInput";


const aboutForm = z.object(
    {
        bio: z.string().max(100).min(5)
    });

type aboutType = z.infer<typeof aboutForm>;    

export default function About()
{
    const  {userInfoHook}= Login();
    const {userdata } = useProfile(userInfoHook.data?.id);
    const {editBio} =  useProfile();
    const {id} = useParams();
    const isOwner = userInfoHook.data?.id ===id;
    const [editMode, seithEditMode] = useState<boolean>(false);

    const {control, handleSubmit} =  useForm<aboutType>({
         resolver: zodResolver(aboutForm)
         
    });

    function Submit(data: aboutType)
    {
        editBio.mutate(data.bio);
    }

    return(<>
    { isOwner && <button onClick={() => seithEditMode(!editMode)}> {editMode? "on Editmod" : "off Editmod"}</button>}

        {editMode ?
        <form onSubmit={handleSubmit(Submit)}>
            <ActivityFormHookTextAreaInput control={control}  name="bio"/>
            <input type="submit" value={"submit bio"} />
        </form>
        : <div>

            {userdata?.bio ? userdata?.bio : "no bio"}
        </div>}



    </>)

}