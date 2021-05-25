import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { Form, Button } from 'semantic-ui-react';

import { useForm } from '../utils/hooks';

function AddPurcheseButton(props) {
  const categoryId = props.categoryId;
  const categoryName = props.name;
  const categoryPrice = props.price;

  const { values, onSubmit } = useForm(createCategoryCallback, {
    categoryId: categoryId,
    name: categoryName,
    price: categoryPrice,
  });

  const [addPurchese] = useMutation(SUBMIT_PURCHESE_MUTATION, {
    variables: values,
  });
  function createCategoryCallback() {
    addPurchese();
  }
  return (
    <Form onSubmit={onSubmit}>
      <Button type='submit' color='red'>
        Purchese
      </Button>
    </Form>
  );
}

const SUBMIT_PURCHESE_MUTATION = gql`
  mutation createPurchase(
    $categoryId: String!
    $name: String!
    $price: String!
  ) {
    createPurchase(categoryId: $categoryId, name: $name, price: $price) {
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

export default AddPurcheseButton;
