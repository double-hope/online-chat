import { gql } from '@apollo/client';

export const typeDefs = gql`
    enum Sort {
        asc
        desc
    }
    input ProductOrderByInput {
        title: Sort
        id: Sort
    }

    input MessageInput {
        text: String!
    }
    
    input AnswerInput {
        text: String!
        productId: Int!
    }
`;