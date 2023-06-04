import React, {useMemo, useRef} from "react";
import {Checkbox} from "../components/Checkbox";

export const useCheckboxGroup = (checkbox: string[]) => {
    const refs: React.MutableRefObject<any[]> = useRef([])

    const elements: any[] = useMemo(() => {
        refs.current = []
        return checkbox.map(name =>
            <Checkbox
                key={name}
                name={name}
                ref={(element) => refs.current.push(element)}/>
        )
    }, [checkbox])

    const concatCategory = (message: string) => {
        const category = refs.current
            .filter(ref => ref)
            .filter(ref => ref.checked)
            .map(ref => ref.dataset.sdName)
        return category.join('') + ' - ' + message;
    };

    const allCheckboxUnselected = () => {
        return refs.current
            .filter(ref => ref)
            .map(ref => ref.checked)
            .every((currentValue) => currentValue === false)
    }

    const renderElements = () => (
        <div className="row">
            {
                elements.map((element, index) => (
                    <div key={index} className="col-4">
                        {element}
                    </div>
                ))
            }
        </div>
    )

    return {
        concatCategory,
        allCheckboxUnselected,
        renderElements,
    }
}
