import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { DummyService } from './services/DummyService';

const TypesErrorMessage = Object.freeze({
  Empty_Message: 'Please write an message.',
  Invalid_Categories: 'Please choice one a several categories.',
});

function App() {
  const [sports, setSports] = useState<boolean>(false);
  const [movies, setMovies] = useState<boolean>(false);
  const [finance, setFinance] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [messageIsInvalid, setMessageIsInvalid] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [queueMessages, setQueueMessages] = useState<string[]>([]);

  const onWriteMessage = async () => {
    // Verfiy that the user has been selected one a several categories
    if (
      [sports, movies, finance].every((currentValue) => currentValue === false)
    ) {
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
    const response = await DummyService.writeMessage(concatCategory(message));
    setQueueMessages((prevState) => [response, ...prevState] as string[]);
  };

  const concatCategory = (message: string) => {
    const category = [];
    if (sports) category.push('[Sport]');
    if (movies) category.push('[Movies]');
    if (finance) category.push('[Finance]');
    return category.join('') + ' - ' + message;
  };

  const formatHistory = () => {
    return queueMessages.reduce((accumulator, current) => {
      accumulator += current + '\n';
      return accumulator;
    }, '');
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center p-2 p-md-5 bg:gray-96">
      <div className="bg:gray-90 b:1px|solid|#CCC p-4 p-sm-5 r:1rem shadow w:26rem">
        <div className="row">
          <div className="col-4">
            <Form.Check
              type="checkbox"
              label="Sports"
              checked={sports}
              onChange={({ target }) => setSports(target.checked)}
            />
          </div>
          <div className="col-4">
            <Form.Check
              type="checkbox"
              label="Finance"
              checked={finance}
              onChange={({ target }) => setFinance(target.checked)}
            />
          </div>
          <div className="col-4">
            <Form.Check
              type="checkbox"
              label="Movies"
              checked={movies}
              onChange={({ target }) => setMovies(target.checked)}
            />
          </div>
        </div>

        <div className="row mt-2">
          <Form.Text>Message</Form.Text>
          <Form.Control
            as="textarea"
            rows={1}
            value={message}
            isInvalid={messageIsInvalid}
            onChange={({ target }) => setMessage(target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {errorMessage}
          </Form.Control.Feedback>
        </div>

        <div className="row my-2">
          <div className="col-6">
            <Button
              className="col-12"
              variant="danger"
              onClick={() => setMessage('')}
            >
              Clear
            </Button>
          </div>
          <div className="col-6">
            <Button
              className="col-12"
              variant="primary"
              onClick={onWriteMessage}
            >
              Send
            </Button>
          </div>
        </div>

        <div className="row">
          <Form.Text>Log History</Form.Text>
          <Form.Control as="textarea" rows={5} value={formatHistory()} />
        </div>
      </div>
    </div>
  );
}

export default App;
