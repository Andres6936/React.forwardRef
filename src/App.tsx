import {useState} from 'react';
import {DummyService} from './services/DummyService';
import {useCheckboxGroup} from "./hooks/useCheckboxGroup";
import {ChangeTheme} from "./components/ChangeTheme";
import {LogHistory} from "./components/LogHistory";
import {AddCheckbox} from "./components/AddCheckbox";

const TypesErrorMessage = Object.freeze({
    Empty_Message: 'Please write an message.',
    Invalid_Categories: 'Please choice one a several categories.',
});

function App() {
    const [checkbox, setCheckbox] = useState<string[]>(['sport', 'movies', 'finance'])
    const checkboxGroup = useCheckboxGroup(checkbox)

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [messageIsInvalid, setMessageIsInvalid] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [queueMessages, setQueueMessages] = useState<string[]>([]);

    const onClearMessage = () => {
        setMessage('')
        setQueueMessages([])
        setMessageIsInvalid(false)
        checkboxGroup.uncheckedAll()
    }

    const onWriteMessage = async () => {
        // Verify that the user has been selected one a several categories
        if (checkboxGroup.everyUnselected()) {
            setMessageIsInvalid(true);
            setErrorMessage(TypesErrorMessage.Invalid_Categories);
            return;
        }

        // Verify that the user has written a message valid (Not empty)
        if (message === '') {
            setMessageIsInvalid(true);
            setErrorMessage(TypesErrorMessage.Empty_Message);
            return;
        }

        setMessageIsInvalid(false);
        // Simulate request to API
        const response = await DummyService.writeMessage(checkboxGroup.concatCategory(message));
        setQueueMessages((prevState) => [response, ...prevState] as string[]);
    };



    return (
        <div
            className="min-h:100vh box:border flex flex:col gap:4rem justify-content:center align-items:center p:2em bg:gray-96 bg:gray-46@dark">
            <ChangeTheme/>

            <AddCheckbox checkbox={checkbox} onAdd={newCheckbox => setCheckbox(newCheckbox)}/>

            <div
                className="bg:gray-90 bg:gray-40@dark b:1px|solid|#CCC b:1px|solid|gray-26@dark p:2em r:1rem box-shadow:4|4|3|gray-90 box-shadow:4|4|3|gray-48@dark w:21rem">
                {checkboxGroup.draw()}

                <div className="flex flex:col mt:1em">
                    <label className={"color:white@dark mb:0.2em"}>Message</label>
                    <input
                        className={"b:1px|solid|#CCC b:1px|solid|black@dark r:1.5em px:1em py:0.5em color:white@dark bg:gray-50@dark"}
                        value={message}
                        onChange={({target}) => setMessage(target.value)}
                    />
                    <p className={messageIsInvalid ? "show m:0 p:0 color:red color:gold-80@dark" : "hidden"}>
                        {errorMessage}
                    </p>
                </div>

                <div className="flex flex:row my:1em">
                    <button
                        className="flex flex:1 align-items:center justify-content:center b:none py:0.5em font:bold font-size:1em rl:1.5em bg:red bg:red/.9:hover color:white"
                        onClick={onClearMessage}>
                        Clear
                    </button>
                    <button
                        className="flex flex:1 align-items:center justify-content:center b:none py:0.5em font:bold font-size:1em rr:1.5em bg:blue bg:blue/.9:hover color:white"
                        onClick={onWriteMessage}>
                        Send
                    </button>
                </div>

                <LogHistory queueMessages={queueMessages}/>
            </div>
        </div>
    );
}

export default App;
