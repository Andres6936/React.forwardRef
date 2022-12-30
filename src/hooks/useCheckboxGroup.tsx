import React, {useMemo, useRef, useState} from "react";
import {Checkbox} from "./Checkbox";

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

    const [sports, setSports] = useState<boolean>(false);
    const [movies, setMovies] = useState<boolean>(false);
    const [finance, setFinance] = useState<boolean>(false);

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
                elements.map(element => (
                    <div className="col-4">
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
