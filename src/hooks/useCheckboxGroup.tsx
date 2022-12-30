import React, {createRef, useMemo, useState} from "react";
import {Checkbox} from "./Checkbox";

export const useCheckboxGroup = (checkbox: string[]) => {
    const refs: any[] = useMemo(() => Array(checkbox.length)
        .fill(createRef()), [checkbox])

    const elements: any[] = useMemo(() => checkbox.map((name, index) =>
            <Checkbox key={name} name={name} ref={refs[index]}/>)
        , [checkbox])

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
        console.log(refs.map(ref => ref.current.checked));

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
