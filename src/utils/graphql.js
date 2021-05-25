import { gql } from '@apollo/client';

export const FETCH_CATEGORY_QUERY = gql`
  {
    getCategoryList {
      id
      name
      price
      amount
      createdAt
      purchases {
        id
        date
        name
        price
      }
    }
  }
`;
