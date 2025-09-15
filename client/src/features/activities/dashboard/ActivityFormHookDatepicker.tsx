import Calendar from "react-calendar";
import { useController, type FieldValues, type UseControllerProps } from "react-hook-form";


type Props<T extends FieldValues> = { label: string } & UseControllerProps<T>


export default function ActivityFormHookDatepicker<T extends FieldValues>(props: Props<T>) {
    const { field, fieldState } = useController(props)



    return (
        <div>
            <Calendar onChange={(val) => 
                {
                    field.onBlur();
                    field.onChange(val)

                }} value={field.value} />
            {fieldState?.error && <span>{fieldState?.error.message}</span>}
        </div>


    )
}