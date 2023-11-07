import {useState} from 'react';
import {DummyService} from './services/DummyService';
import {useCheckboxGroup} from "./hooks/useCheckboxGroup";

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
        <main className="min-h:100vh flex flex:col font:sans">
            <section className="flex flex:col px:1rem py:0.8rem border-bottom:1px|solid|#CCC">
                <div className="flex flex:row align-items:center gap:1rem">
                    <h1 className="font-size:1rem">Conference Meeting</h1>
                    <p className="bg:#EBEBEB color:#8D8D8D px:0.6rem py:0.2rem r:0.8rem font-size:0.9rem">4h left</p>
                </div>

                <div className="flex flex:row pt:1rem">
                    <div className="flex flex:col">
                        <p className="font-size:2rem font:semibold">6:00</p>
                        <p className="color:#8D8D8D">Sat, Dec 11</p>
                    </div>
                    <div className="flex flex:col">
                        <p className="font-size:2rem font:semibold">7:00</p>
                        <p className="color:#8D8D8D">Sat, Dec 11</p>
                    </div>
                </div>
            </section>

            <section className="flex flex:col flex:1 h:full gap:0.6rem py:0.7rem">
                <div className="flex align-items:center justify-content:center">
                    <p className="text:center font-size:0.8rem font:semibold color:#828282">23:40</p>
                </div>

                <div className="flex flex:col justify-content:start">
                    <div
                        className="flex flex-basis:50% max-w:80% justify-content:start pl:1rem align-items:end gap:0.2rem">
                        <span className="bg:green min-w:1.3rem min-h:1.3rem r:50%"></span>
                        <p className="bg:#F2F2F2 p:0.8rem r:1rem">Where do we want to meet guys? I need to know
                            before</p>
                    </div>
                </div>

                <div className="flex flex:col justify-content:end">
                    <div className="flex flex-basis:50% justify-content:end pr:1rem align-items:end gap:0.2rem">
                        <p className="bg:#FAE4CB p:0.8rem r:1rem">Hm... Let me think</p>
                        <span className="bg:#FAE4CB w:0.8rem h:0.8rem r:50%"></span>
                    </div>
                </div>

                <div className="flex flex:col justify-content:start">
                    <div
                        className="flex flex-basis:50% max-w:80% justify-content:start pl:1rem align-items:end gap:0.2rem">
                        <span className="bg:green min-w:1.3rem min-h:1.3rem r:50%"></span>
                        <div className="bg:#F2F2F2 p:0.8rem r:1rem">
                            <p>What do you want to eat?</p>

                            <div className="flex flex:col gap:0.2rem mt:0.8rem">
                                <div className="bg:white p:0.6rem r:0.6rem">
                                    <p>Pizza</p>
                                </div>

                                <div className="bg:white p:0.6rem r:0.6rem">
                                    <p>Burgers</p>
                                </div>
                            </div>

                            <div className="flex flex:row justify-content:end gap:0.7rem mt:0.6rem">
                                <p className="font-size:0.7rem color:#828282">8 votes</p>
                                <p className="font-size:0.7rem color:#828282">Vote to see results</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex flex:col px:0.6rem py:0.6rem">
                <div className="flex flex:col bg:#F1F1F1 border:1px|solid|#CCC r:1rem">
                    <input type="text"
                           className="w:full bg:#F1F1F1 px:0.6rem py:1rem border:0px|solid|#CCC r:1rem outline:none"
                           placeholder="Message to Conference Meeting"/>

                    <div className="flex flex:row justify-content:between align-items:center px:0.6rem pb:0.4rem">
                        <div className="flex flex:row flex:1 gap:0.5rem">
                            <span className="w:1.8rem h:1.8rem square bg:black r:0.5rem"></span>
                            <span className="w:1.8rem h:1.8rem square bg:black r:0.5rem"></span>
                            <span className="w:1.8rem h:1.8rem square bg:black r:0.5rem"></span>
                        </div>

                        <div className="flex flex:col flex:1">
                            <button
                                className="bg:black color:white font:bold border:1px|solid|black r:0.3rem py:0.5rem">Send
                                now
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default App;
