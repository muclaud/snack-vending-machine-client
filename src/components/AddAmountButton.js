import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { Form, Input } from 'semantic-ui-react';

import { useForm } from '../utils/hooks';

function AddAmountButton(props) {
  const categoryId = props.categoryId;
  const { values, onChange, onSubmit } = useForm(addAmountCallback, {
    amount: '',
    categoryId: categoryId,
  });

  const [addAmount] = useMutation(ADD_AMOUNT_MUTATION, {
    variables: values,
  });

  function addAmountCallback() {
    addAmount();
  }

  return (
    <Form onSubmit={onSubmit}>
      <div className='ui action fluid'>
        <Input
          placeholder='Add amount'
          type='number'
          name='amount'
          min={1}
          onChange={onChange}
        />
        <button type='submit' className='ui button teal'>
          Add amount
        </button>
      </div>
    </Form>
  );
}

const ADD_AMOUNT_MUTATION = gql`
  mutation addItem($categoryId: ID!, $amount: String!) {
    addItem(categoryId: $categoryId, amount: $amount) {
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
export default AddAmountButton;
