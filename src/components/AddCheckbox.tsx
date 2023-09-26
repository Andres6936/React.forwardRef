import {ChangeEvent, useMemo, useState} from "react";
import {useString} from "../hooks/useString";

interface Props {
    checkbox: string[],
    onAdd: (newCheckbox: string[]) => void
}

export const AddCheckbox = (props: Props) => {
    const transformString = useString()

    // Used for formatter the array of string to a unique string with a beautiful format
    const checkboxValue = useMemo(() => {
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

    const [value, setValue] = useState<string>(checkboxValue)

    const onChangeInput = ({target}: ChangeEvent<HTMLInputElement>) => {
        setValue(target.value.toString())

        const newCheckbox = target.value
            .replace(' ', '')
            .split(',')
            .filter(item => item.length > 1)
            .map(item => item.trim())

        props.onAdd(newCheckbox)
    }

    return (
        <div
            className={"flex flex:col my:1rem"}>
            <label className={"color:white@dark mb:0.4em px:0.5rem opacity:0.7"} htmlFor="">
                Write comma-separated to create a new checkbox
            </label>
            <input autoCorrect={"off"} onChange={onChangeInput}
                   className={"b:1px|solid|#CCC b:1px|solid|black@dark r:1.5em px:1em py:0.5em color:white@dark bg:gray-50@dark font-size:1rem color:#00000066 font:bold"}
                   type="text" value={value}/>
        </div>
    )
}