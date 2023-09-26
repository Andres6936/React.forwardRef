import React, {ReactNode, useMemo, useRef} from "react";
import {Checkbox} from "../components/Checkbox";

export const useCheckboxGroup = (checkbox: string[]) => {
    const refs: React.MutableRefObject<(HTMLInputElement | null)[]> = useRef([])

    const elements: ReactNode[] = useMemo(() => {
        refs.current = []
        return checkbox.map(name =>
            <Checkbox
                key={name}
                name={name}
                ref={(element) => refs.current.push(element)}/>
        )
    }, [checkbox])

    const uncheckedAll = () => {
        for (let checkbox of refs.current) {
            if (checkbox?.checked) {
                checkbox.checked = false
            }
        }
    }

    const concatCategory = (message: string) => {
        const category = refs.current
            .filter(ref => ref)
            .filter(ref => ref?.checked)
            .map(ref => ref?.dataset.sdName)
        return category.join('') + ' - ' + message;
    };

    const everyUnselected = () => {
        return refs.current
            .filter(ref => ref)
            .map(ref => ref?.checked)
            .every((currentValue) => currentValue === false)
    }

    const draw = () => (
        <div className="flex flex:row flex:wrap gap-x:2em gap-y:0.5rem align-items:center justify-content:start">
            {
                elements.map((element, index) => (
                    <div
                        className="flex flex:1 flex-basis:20% flex:row flex:wrap align-items:center justify-content:start"
                        key={index}>
                        {element}
                    </div>
                ))
            }
        </div>
    )

    return {
        concatCategory,
        everyUnselected,
        uncheckedAll,
        draw,
    }
}
