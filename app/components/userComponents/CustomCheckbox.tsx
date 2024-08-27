import { MouseEventHandler } from "react";

interface CheckboxProps {
    name: string
    id: string
    value: string
    changeHandler: React.ChangeEventHandler<HTMLInputElement>
}

// const handleCheck = (e: React.MouseEvent<HTMLInputElement>) => {
//     let fakeBox =  e.target as HTMLInputElement;
//     let input = fakeBox.querySelector("input");
//     if (input == null) {
//         return;
//     }
//     input.checked = !input.checked;
// }

export const CustomCheckbox = (props: CheckboxProps) => {
    return (
        // <div className="custom-checkbox" onClick={handleCheck}>
        <div className="custom-checkbox">
            <input type="checkbox" name={`${props.name}`} id={props.id} value={props.value} onChange={props.changeHandler}/>
            <label htmlFor={props.id}>{props.value}</label>
        </div>
    )
}