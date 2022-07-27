import { gql } from '@apollo/client';

export const typeDefs = gql`
    enum Sort {
        asc
        desc
    }

    input MessageOrderByInput{
        createdAt: Sort
        likes: Sort
        dislikes: Sort
    }

    input MessageInput {
        text: String!
    }
    
    input AnswerInput {
        text: String!
        productId: Int!
    }
`;