import { useContext, useEffect } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import {  z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActivity } from "../../hooks/useActivity";

import { useNavigate, useParams } from "react-router-dom";
import ActivityFormHookTextInput from "./ActivityFormHookTextInput";
import ActivityFormHookTextAreaInput from "./ActivityFormHookTextAreaInput";
import ActivityFormHookSelect from "./ActivityFormHookSelect";
import ActivityFormHookDatepicker from "./ActivityFormHookDatepicker";
import ActivityFormHookAutocomplite from "./ActivityFormHookAutocomplite";
import { ActivityContext } from "../../../app/layout/App";
import type { Activity } from "../../../lib/types";


const emptyActivity: Activity = {
    id: "",
    title: "",
    description: "",
    category: "",
    date: new Date().toISOString().slice(0, 16),    // для <input type="datetime-local" /> пустая строка — ок
    city: "",
    venue: ""
};

enum Category {
  drinks = "drinks",
  culture = "culture",
  music   = "music",
  travel  = "travel",
  film    = "film"
}

type Addres ={
    City: string,
    Venue: string,
    Latitude: number,
    Longitude: number
}

const addressPayloadSchema = z.object({
  city: z.string().min(1).optional(),
  venue: z.string().min(1).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
});

    const shema = z.object({
        title: z.string().trim().min(3, "Введите заголовок"),
        description: z.string().trim().min(4, "Введите описание"),
        category:z.enum(Category, "Select something"),
        date: z.date().min(new Date, {message: "Дата должна быть больше текущей" }),
        addressSelected: addressPayloadSchema.nullable(),
    });

type FormSchema = z.infer<typeof shema>

function mapFormToActivity(form: FormSchema): Activity {
  return {
    title: form.title,
    description: form.description,
    category: form.category,
    date: form.date.toISOString(), // API обычно принимает строку
    isCancelled: false, // по умолчанию
    city: form.addressSelected?.city ?? "",
    venue: form.addressSelected?.venue ?? "",
    latitude: form.addressSelected?.latitude ?? 0,
    longitude: form.addressSelected?.longitude ?? 0,
  }
}

export default function ActivityFormHook() {

    const { id } = useParams();
    const context = useContext(ActivityContext);
    const { data, isLoading } = useActivity(id)
    const navigate =useNavigate();

    useEffect(() => {
        if(data)
        {   
            const {title, description, category, date: eventDate, ...location} = data;
            
            const cat = category as Category;
            const aData = new Date(eventDate);
            reset({title: title, description: description, category: cat, 
                date: aData, addressSelected: location })
        }
    }, [data]);



    type FormSchema = z.infer<typeof shema>


    const {
        control,
        handleSubmit,
        reset
    } = useForm<FormSchema>({
        mode: "onBlur",
        reValidateMode: "onChange",
        resolver: zodResolver(shema)
    });

    const onSubmit: SubmitHandler<FormSchema> = async (data) => {

        
        var publish = data;
        if(!!id)
        {
            publish = {...publish, id:id};
        }

       const res = await  context?.modifyActivity(mapFormToActivity(publish));
               
        if(res)
        navigate(-1);
        
    };

    if (isLoading) return (<>111</>)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ActivityFormHookTextInput<FormSchema>  
                control={control} 
                name="title"  />
            <ActivityFormHookTextAreaInput<FormSchema>  
                control={control} 
                name="description"   />
            <ActivityFormHookSelect
                control={control} 
                name="category"  
                options={Category}
            />
            <ActivityFormHookDatepicker 
                control={control} 
                name="date" 
                label="date"
            />
            <ActivityFormHookAutocomplite 
                control={control}
                name="addressSelected" 
                label="addressSelected"
            />


            <input type="submit" />
        </form>
    )
}