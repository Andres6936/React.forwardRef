import React, {ForwardedRef, useMemo, useState} from "react";

interface Props {
    name: string,
}

function capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

export const Checkbox = React.forwardRef((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const [isChecked, setIsChecked] = useState<boolean>(false)

    const labelId = useMemo(() => {
        return 'Label-' + props.name.replace(' ', '')
    }, [props.name])

    return (
        <div className={"flex gap:0.3em flex:row align-items:center"}>
            <input
                className={"r:50% color:white@dark"}
                type="checkbox"
                ref={ref} id={labelId}
                data-sd-name={`[${capitalizeFirstLetter(props.name)}]`}
                checked={isChecked}
                onChange={({target}) => setIsChecked(target.checked)}
            />
            <label htmlFor={labelId} className={"color:white@dark m:0 p:0"}>
                {capitalizeFirstLetter(props.name)}
            </label>
        </div>
    )
})
