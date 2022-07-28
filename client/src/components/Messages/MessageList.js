import React, { useState } from 'react';
import { MessageItem } from './MessageItem';
import './Message.css';
import CreateMessage from './CreateMessage';
import CreateAnswer from "../Answers/CreateAnswer";

export const MessageList = ({data, page, setPage}) => {

    const [answer, setAnswer] = useState(false);
    const [answeredMessage, setAnsweredMessage] = useState([]);

    return (
        <div className="container">
            <div className="messages-container">
                {
                    data.messages.messageList.map(message => (
                        <MessageItem key={message.id} message={message} setAnswer={setAnswer} setAnsweredMessage={setAnsweredMessage} page={page}/>
                    ))
                }
            </div>
            {answer
                ?<CreateAnswer message={answeredMessage} setAnswer={setAnswer} page={page}/>
                :<CreateMessage page={page} setPage={setPage}/>
            }

        </div>
    );
}