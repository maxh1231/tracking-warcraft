import { gql } from '@apollo/client';

export const QUERY_TOKEN = gql`
    query getToken {
        getToken {
            createdAt
            access_token
        }
    }
    
`;

export const QUERY_USERS = gql`
    query Users {
        users {
            _id
            username
            email
            createdAt
        }
    }
`;
export const QUERY_USER = gql`
    query User($username: String!) {
        user(username: $username) {
        username
        email
        password
        _id
        }
    }
`;