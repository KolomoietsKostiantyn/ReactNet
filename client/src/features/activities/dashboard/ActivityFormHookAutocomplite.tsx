
import { useEffect, useRef, useState } from "react";
import { useController, type FieldElement, type FieldValue, type UseControllerProps } from "react-hook-form";

type Props<T extends FieldValue> ={
    label: string,
}& React.InputHTMLAttributes<HTMLInputElement> & UseControllerProps<T>



export default function ActivityFormHookAutocomplite<T extends FieldValue>(props: Props<T> )
{
    const key = "pk.05b33ec100d03ad2b3008ab474536e89";
    const [suggestionArray, updatesuggestionArray] = useState<[]>();
    const [query, setQuery] = useState(""); 
    const { field, fieldState} = useController(props)
    const {label, adres, ...args} = props
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const getSugestion = (request) =>{
        setQuery(request.target.value);
        if(request.target.value.length> 3)
        {
            
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                 fetch(`https://us1.locationiq.com/v1/autocomplete?key=${key}&q=${encodeURIComponent(request.target.value)}&limit=5`).then((res) => res.json())
             .then((data) => { 
                updatesuggestionArray(data);  
             })
            }, 500);      
        }      
    }

    useEffect(()=> {
        
        setQuery(`${field.value?.city ?? ''} ${field.value?.venue ?? ''}`);

    },[field.value]);

    const selectValue = (el) =>{

        field.onBlur();        
        field.onChange({latitude: Number(el.lat), longitude: Number(el.lon), city: el.address?.city ?? el.address?.name, venue: el.display_address})
        updatesuggestionArray([]);
    }

    return(<>
        <input
        {...args}
        {...field}
        value={query}
        onChange={getSugestion}
        />
        <ul>
            {suggestionArray?.map((x) =>(
                
                <li><button type="button" onClick={() =>selectValue(x)}>{`${x.address.city ?? x.address.name} ${x.display_address}`}</button></li>
            ))}            
        </ul>
          {fieldState?.error && <span>{fieldState?.error.message}</span>}
    </>)

}