import React, {useEffect, useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './Header/Header';
import { MessageList } from './Messages/MessageList';
import AnswersList from './Answers/AnswersList';
import './styles.css';
import {useQuery} from '@apollo/client';
import {GET_MESSAGES, NEW_MESSAGE} from '../queries';
import {MESSAGES_COUNT, orderBy} from '../constants';

export function App() {

    const [messageData, setMessageData] = useState('');
    const [sorting, setSorting] = useState(orderBy);
    const [page, setPage] = useState(0);


    const { loading, error, data, subscribeToMore } = useQuery(GET_MESSAGES,{
        variables: {
            skip: page * MESSAGES_COUNT,
            take: MESSAGES_COUNT,
            orderBy: sorting,
        },
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
    console.log(data)
  return (
      <div>
        <Header setData={setMessageData} setSorting={setSorting}/>
        <Routes>
            {messageData
                ?<Route path="/" element={<MessageList data={messageData} page={page} setPage={setPage}/>} />
                :<Route path="/" element={<MessageList data={data} page={page} setPage={setPage}/>} />
            }

            <Route path="/answers/:id" element={<AnswersList page={page}/>} />
        </Routes>
      </div>
  );
}