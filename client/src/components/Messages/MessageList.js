import React, {useEffect, useState} from 'react';
import { useQuery } from '@apollo/client';
import { GET_MESSAGES, NEW_MESSAGE } from '../../queries';
import { MessageItem } from './MessageItem';
import './Message.css';
import CreateMessage from './CreateMessage';
import {orderBy} from '../../constants';
import CreateAnswer from "../Answers/CreateAnswer";

export const MessageList = () => {

    const [answer, setAnswer] = useState(false);
    const [answeredMessage, setAnsweredMessage] = useState([]);

    const { loading, error, data, subscribeToMore } = useQuery(GET_MESSAGES,{
        variables: { orderBy },
    });

    useEffect(() => {
        subscribeToMore({
            document: NEW_MESSAGE,
            updateQuery: (prev, { subscriptionData }) => {

                if (!subscriptionData.data) {
                    return prev;
                }

                const { newMessage } = subscriptionData.data;
                return {
                    ...prev,
                    messages: {
                        ...prev.messages,
                        messageList: [{ ...newMessage, answers: [] }, ...prev.messages.messageList],
                    },
                };
            },
        });
    }, [subscribeToMore]);


    if (loading) {
        return <div>Is Loading...</div>;
    }

    if (error) {
        return <div>Oops, error...</div>;
    }

    return (
        <div className="container">
            <div className="messages-container">
                {
                    data.messages.messageList.map(message => (
                        <MessageItem key={message.id} message={message} setAnswer={setAnswer} setAnsweredMessage={setAnsweredMessage}/>
                    ))
                }
            </div>
            {answer
                ?<CreateAnswer message={answeredMessage} setAnswer={setAnswer}/>
                :<CreateMessage />
            }

        </div>
    );
}