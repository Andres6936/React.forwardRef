import {useMemo} from "react";
import {useString} from "../hooks/useString";

interface Props {
    checkbox: string[],
    onAdd: (newCheckbox: string[]) => void
}

export const AddCheckbox = (props: Props) => {
    const transformString = useString()

    // Used for formatter the array of string to a unique string with a beautiful format
    const value = useMemo(() => {
        return props.checkbox.reduce((accumulator, current, currentIndex) => {
            // Avoid add ',' and a space in the first string
            if (currentIndex === 0) {
                accumulator += transformString.capitalizeFirstLetter(current)
            } else {
                accumulator += ', ' + transformString.capitalizeFirstLetter(current)
            }
            return accumulator;
        }, '')
    }, [props.checkbox])

    return (
        <div
            className={"bg:gray-90 bg:gray-40@dark b:1px|solid|#CCC b:1px|solid|gray-26@dark p:2em r:1rem box-shadow:4|4|3|gray-90 box-shadow:4|4|3|gray-48@dark w:21rem flex flex:col"}>
            <label className={"color:white@dark mb:0.2em"} htmlFor="">
                Add Checkbox
            </label>
            <input autoCorrect={"off"}
                   className={"b:1px|solid|#CCC b:1px|solid|black@dark r:1.5em px:1em py:0.5em color:white@dark bg:gray-50@dark"}
                   type="text" value={value}/>
        </div>
    )
}