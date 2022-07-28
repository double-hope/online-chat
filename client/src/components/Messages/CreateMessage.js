import React, {useState} from 'react';
import {CREATE_MESSAGE, GET_MESSAGES} from "../../queries";
import { useMutation } from '@apollo/client';
import {MESSAGES_COUNT, orderBy} from '../../constants';

const CreateMessage = ({page, setPage}) => {

    const [text, setText] = useState('')

    const [createMessage, { loading, error }] = useMutation(CREATE_MESSAGE, {
        refetchQueries: [
            { query: GET_MESSAGES,
                variables: {
                    skip: page * MESSAGES_COUNT,
                    take: MESSAGES_COUNT,
                    orderBy
            } },
        ],
        onCompleted: () => console.log(createMessage),
    });

    const handleMessageCreate = () => {
        createMessage({
            variables: {
                message: { text },
            },
        }).then(r => console.log(r));
        setText('');
    };

    // const onKeyUp = ev => {
    //     const enterKeyCode = 13;
    //     if (ev.keyCode === enterKeyCode) {
    //         handleMessageCreate();
    //     }
    // };
    //
    // document.addEventListener('keyup', onKeyUp);
    const doPaginationPrevious = () => {
        setPage(page - 1);
    }
    const doPaginationNext = () => {
        setPage(page + 1);
    }

    return (
        <div className="enter-message-container">
            <button className="more">
                <i className="fas fa-caret-up more-icon" onClick={doPaginationPrevious}/>
            </button>
            <div className="enter-message">
                <textarea placeholder="Message..." value={text}  onChange={e => setText(e.target.value)}/>
                <button onClick={handleMessageCreate} id="send">Send</button>
            </div>
            <button className="more">
                <i className="fas fa-caret-down more-icon" onClick={doPaginationNext}/>
            </button>
        </div>
    );
};

export default CreateMessage;