import React, {ForwardedRef, useState} from "react";
import Form from "react-bootstrap/Form";

interface Props {
    name: string,
}

export const Checkbox = React.forwardRef((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const [isChecked, setIsChecked] = useState<boolean>(false)

    return (
        <Form.Check
            type="checkbox"
            ref={ref}
            label={props.name}
            checked={isChecked}
            onChange={({target}) => setIsChecked(target.checked)}
        />
    )
})
