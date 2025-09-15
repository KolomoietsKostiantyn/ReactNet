import { useController, type FieldValues, type UseControllerProps } from "react-hook-form";

type Props<T extends FieldValues> ={label?: string} & React.InputHTMLAttributes<HTMLTextAreaElement> & UseControllerProps<T>

export default function ActivityFormHookTextAreaInput<T extends FieldValues>(props: Props<T>)
{
    const {field,fieldState} = useController(props);
    const {label, ...args} = props;
    return(<div>
        <label htmlFor={field.name}>{label}</label>
        <textarea  id={field.name} type="textarea"
        {...args}
        {...field}        
        style={{
            resize:"none"
        }}
        
        />
        {fieldState?.error && <span>{fieldState?.error.message}</span>}


    </div>);

}