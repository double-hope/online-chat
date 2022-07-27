import React, {useState} from 'react';
import {CREATE_MESSAGE, GET_MESSAGES} from "../../queries";
import { useMutation } from '@apollo/client';
import {orderBy} from '../../constants';

const CreateMessage = () => {

    const [text, setText] = useState('')

    const [createMessage, { loading, error }] = useMutation(CREATE_MESSAGE, {
        refetchQueries: [
            { query: GET_MESSAGES, variables: { orderBy } },
        ],
        onCompleted: () => console.log(createMessage),
    });

    const handleProductCreate = () => {
        createMessage({
            variables: {
                message: { text },
            },
        }).then(r => console.log(r));
        setText('');
    };

    return (
        <div className="enter-message-container">
            <div className="enter-message">
                <textarea placeholder="Message..." value={text}  onChange={e => setText(e.target.value)}/>
                <button onClick={handleProductCreate}>Send</button>
            </div>
        </div>
    );
};

export default CreateMessage;