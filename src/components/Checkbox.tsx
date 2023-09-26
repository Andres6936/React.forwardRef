import React, {ForwardedRef, useMemo, useState} from "react";
import {useString} from "../hooks/useString";

interface Props {
    name: string,
}

export const Checkbox = React.forwardRef((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const transformString = useString();
    const [isChecked, setIsChecked] = useState<boolean>(false)

    const labelId = useMemo(() => {
        return transformString.getLabelUsing(props.name)
    }, [props.name])

    return (
        <div className={"flex flex:1 gap:0.3em flex:row align-items:center"}>
            <input
                className={"r:50% color:white@dark h:1rem w:1rem"}
                type="checkbox"
                ref={ref} id={labelId}
                data-sd-name={`[${transformString.capitalizeFirstLetter(props.name)}]`}
                checked={isChecked}
                onChange={({target}) => setIsChecked(target.checked)}
            />
            <label htmlFor={labelId} className={"color:white@dark m:0 p:0"}>
                {transformString.capitalizeFirstLetter(props.name)}
            </label>
        </div>
    )
})
