import { gql } from '@apollo/client';

export const GET_MESSAGES = gql`
    query getMessages($orderBy: MessageOrderByInput!){
        messages(orderBy: $orderBy){
            messageList{
                id
                text
                likes
                dislikes
                answers {
                    id
                    text
                    likes
                    dislikes
                }
            }
        }
    }
`;

export const GET_FILTERED_MESSAGES = gql`
    query getMessages($filter: String!, $orderBy: MessageOrderByInput!){
        messages(filter: $filter, orderBy: $orderBy){
            messageList{
                id
                text
                likes
                dislikes
                answers {
                    id
                    text
                    likes
                    dislikes
                }
            }
        }
    }
`;

export const CREATE_MESSAGE = gql`
    mutation createMessage($message: MessageInput!) {
        createMessage(message: $message) {
            id
            text
        }
    }
`;

export const UPDATE_LIKES = gql`
    mutation updateLikes($message: LikesInput!) {
        updateLikes(message: $message) {
            id
            likes
        }
    }
`;

export const UPDATE_DISLIKES = gql`
    mutation updateDislikes($message: DislikesInput!) {
        updateDislikes(message: $message) {
            id
            dislikes
        }
    }
`;

export const CREATE_ANSWER = gql`
    mutation createAnswer($answer: AnswerInput!) {
        createAnswer(answer: $answer) {
            id
            text
            likes
            dislikes
        }
    }
`;

export const NEW_MESSAGE = gql`
    subscription newMessage {
        newMessage {
            id
            text
            likes
            dislikes
        }
    }
`;

export const CHANGE_LIKES = gql`
    subscription updatedLikes {
        updatedLikes {
            id
            text
            likes
            dislikes
        }
    }
`;

export const CHANGE_DISLIKES = gql`
    subscription updatedDislikes {
        updatedDislikes {
            id
            text
            likes
            dislikes
        }
    }
`;