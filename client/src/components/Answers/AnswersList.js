import React from 'react';
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_MESSAGES} from "../../queries";
import {MESSAGES_COUNT, orderBy} from "../../constants";
import AnswerItem from "./AnswerItem";

const AnswersList = ({page}) => {
    const id = useParams();
    let answers = [];

    const { loading, error, data, subscribeToMore } = useQuery(GET_MESSAGES,{
        variables: {
            skip: page * MESSAGES_COUNT,
            take: MESSAGES_COUNT,
            orderBy },
    });

    if(data){
        data.messages.messageList.map(message => {
            if(message.id == id.id){
                answers = message.answers;
            }
        });

    }

    if (loading) {
        return <div>Is Loading...</div>;
    }

    if (error) {
        return <div>Oops, error...</div>;
    }

    return (
        <div className="container">
            <div className="messages-container">
                { answers.length
                    ? answers.map(answer => (
                        <AnswerItem key={answer.id} answer={answer}/>
                    ))
                    : <></>
                }
            </div>
        </div>
    );
};

export default AnswersList;