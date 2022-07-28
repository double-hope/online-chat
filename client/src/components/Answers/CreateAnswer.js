import React, {useState} from 'react';
import './Answers.css';
import {CREATE_ANSWER, GET_MESSAGES} from "../../queries";
import {MESSAGES_COUNT, orderBy} from '../../constants';
import {useMutation} from '@apollo/client';

const updateMessageStore = (messageId, page) => (cache, { data: { createAnswer } }) => {

    const { messages } = cache.readQuery({
        query: GET_MESSAGES,
        variables: {
            skip: page * MESSAGES_COUNT,
            take: MESSAGES_COUNT,
            orderBy },
    });

    const updatedMessages = messages.messageList.map(item => {

        if (item.id === messageId) {

            return {
                ...item,
                answers: [...item.answers, createAnswer],
            };
        }

        return item;
    });

    cache.writeQuery({
        query: GET_MESSAGES,
        variables: { orderBy },
        data: { messages: { ...messages, messageList: updatedMessages } },
    });
};

const CreateAnswer = ({message, setAnswer, page}) => {
    const [text, setText] = useState('');

    const messageId = message.id;

    const [createAnswer, { loading, error }] = useMutation(CREATE_ANSWER, {
        update: updateMessageStore(messageId, page),
    });

    const sendReply = () => {
        createAnswer({
            variables: {
                answer: { messageId, text },
            },
        }).then(r => console.log(r));
        setAnswer(false);
    }

    window.addEventListener('keydown', (e)=>{
        const escapeKeyCode = 27;
        if(e.keyCode === escapeKeyCode){
            setAnswer(false);
        }
    });

    return (
        <div className="reply-message-container">
            <div className="reply-to">
                <span>{message.text}</span>
                <span>#{message.id}</span>
            </div>
            <div className="reply-message">
                <textarea placeholder="Reply to..." value={text} onChange={e => setText(e.target.value)}/>
                <button onClick={sendReply}>Reply</button>
            </div>
        </div>
    );
};

export default CreateAnswer;