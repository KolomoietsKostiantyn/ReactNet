import type React from "react"
import {useController, type FieldValues, type UseControllerProps} from "react-hook-form"

type Props<T extends FieldValues> = UseControllerProps<T> & React.InputHTMLAttributes<HTMLInputElement> 
& {label?: string }


export default function ActivityFormHookTextInput<T extends FieldValues>(
    props : Props<T>)
{
    const {field, fieldState} = useController(props);
    const {label, ...rest} = props;
    
    return(<div>
        <label htmlFor={field.name}>{label}</label>
        <input id={field.name} {...rest} {...field} />
        {fieldState.error   && <span>{fieldState.error.message}</span> }
    </div>)
}