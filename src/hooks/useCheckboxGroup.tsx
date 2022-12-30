import React, {useMemo, useRef, useState} from "react";
import {Checkbox} from "./Checkbox";

export const useCheckboxGroup = (checkbox: string[]) => {
    const refs: React.MutableRefObject<any[]> = useRef([])

    const elements: any[] = useMemo(() =>
        checkbox.map(name =>
            <Checkbox
                key={name}
                name={name}
                ref={(element) => refs.current.push(element)}/>
        ), [checkbox])

    const [sports, setSports] = useState<boolean>(false);
    const [movies, setMovies] = useState<boolean>(false);
    const [finance, setFinance] = useState<boolean>(false);

    const concatCategory = (message: string) => {
        const category = [];
        if (sports) category.push('[Sport]');
        if (movies) category.push('[Movies]');
        if (finance) category.push('[Finance]');
        return category.join('') + ' - ' + message;
    };

    const allCheckboxUnselected = () => {
        console.log(refs.current);

        const value = [sports, movies, finance].every((currentValue) => currentValue === false)
        return true
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
