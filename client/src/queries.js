import { gql } from '@apollo/client';

export const GET_MESSAGES = gql`
    query getMessages{
        messages{
            messageList{
                id
                text
                likes
                dislikes
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

// export const CREATE_ANSWER = gql`
//     mutation createAnswer($answer: AnswerInput!) {
//         createAnswer(answer: $answer) {
//             id
//             text
//         }
//     }
// `;

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