import { gql } from '@apollo/client';

export const QUERY_TOKEN = gql`
    query getToken {
        getToken {
            createdAt
        }
    }
    
`;