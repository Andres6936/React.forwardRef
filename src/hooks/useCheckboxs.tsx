import React, {useState} from "react";
import Form from "react-bootstrap/Form";

export const useCheckboxs = (checkbox: string[]) => {
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

    const allCheckboxUnselected = () => [sports, movies, finance]
        .every((currentValue) => currentValue === false)

    const renderElements = () => (
        <div className="row">
            <div className="col-4">
                <Form.Check
                    type="checkbox"
                    label="Sports"
                    checked={sports}
                    onChange={({target}) => setSports(target.checked)}
                />
            </div>
            <div className="col-4">
                <Form.Check
                    type="checkbox"
                    label="Finance"
                    checked={finance}
                    onChange={({target}) => setFinance(target.checked)}
                />
            </div>
            <div className="col-4">
                <Form.Check
                    type="checkbox"
                    label="Movies"
                    checked={movies}
                    onChange={({target}) => setMovies(target.checked)}
                />
            </div>
        </div>
    )

    return {
        concatCategory,
        allCheckboxUnselected,
        renderElements,
    }
}
