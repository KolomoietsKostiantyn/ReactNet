import { useController, type FieldValues, type UseControllerProps } from "react-hook-form";
import type { EnumLike } from "zod/v3";

type Props<T extends FieldValues, M extends EnumLike> ={label?: string} & React.InputHTMLAttributes<HTMLSelectElement> & UseControllerProps<T> & {options: M}

export default function ActivityFormHookSelect<T extends FieldValues, M extends EnumLike >(props: Props<T, M>)
{
    const {field,fieldState} = useController(props);
    const {label,options, ...args} = props;
    const optionsList = Object.keys(options);
    
    return(<div>
        <label htmlFor={field.name}>{label}</label>

 

        <select
            {...args}
            {...field}  
            id={field.name}>   
                   <option key="empty"> </option>
            {optionsList.map(x => (<option key={x}>{x}</option>))}


        </select>





        
        {fieldState?.error && <span>{fieldState?.error.message}</span>}


    </div>);

}