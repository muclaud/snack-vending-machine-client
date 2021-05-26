import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { Form, Button } from 'semantic-ui-react';

import { useForm } from '../utils/hooks';

function DeleteButton(props) {
  const categoryId = props.categoryId;

  const { values, onSubmit } = useForm(deleteCategoryCallback, {
    categoryId: categoryId,
  });

  const [getClear] = useMutation(DELETE_CATEGORY_MUTATION, {
    variables: values,
  });
  function deleteCategoryCallback() {
    getClear();
  }
  return (
    <Form onSubmit={onSubmit}>
      <Button type='submit' color='red'>
        Clear
      </Button>
    </Form>
  );
}

const DELETE_CATEGORY_MUTATION = gql`
  mutation getClear($categoryId: ID!) {
    getClear(categoryId: $categoryId) {
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

export default DeleteButton;
