import {useMemo} from "react";

interface Props {
    queueMessages: string[]
}

export const LogHistory = (props: Props) => {

    const formatHistory = useMemo(() => {
        return props.queueMessages.reduce((accumulator, current) => {
            accumulator += current + '\n';
            return accumulator;
        }, '');
    }, [props.queueMessages])

    return (
        <div className="flex flex:col">
            <label className={"color:white@dark mb:0.2em"}>Log History</label>
            <textarea
                className={"b:1px|solid|#CCC b:1px|solid|black@dark color:white@dark px:1em py:0.5em r:1em bg:gray-50@dark"}
                rows={5}
                value={formatHistory}
                readOnly={true}/>
        </div>
    )
}