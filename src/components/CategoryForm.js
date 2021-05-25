import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client';

import { useForm } from '../utils/hooks';
import { FETCH_CATEGORY_QUERY } from '../utils/graphql';

function AddCategoryForm() {
  const { values, onChange, onSubmit } = useForm(createCategoryCallback, {
    name: '',
    price: '',
    amount: '',
  });

  const [createCategory] = useMutation(CREATE_CATEGORY_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_CATEGORY_QUERY,
      });

      let newData = [...data.getCategoryList];
      newData = [result.data.createCategory, ...newData];
      proxy.writeQuery({
        query: FETCH_CATEGORY_QUERY,
        data: {
          ...data,
          getCategoryList: {
            newData,
          },
        },
      });
      values.name = '';
      values.price = '';
      values.amount = '';
    },
  });

  function createCategoryCallback() {
    createCategory();
  }

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit}>
        <h2>Create a category:</h2>
        <Form.Field>
          <Form.Input
            placeholder='Category name'
            name='name'
            onChange={onChange}
            value={values.name}
          />
          <Form.Input
            placeholder='Category price'
            name='price'
            onChange={onChange}
            value={values.price}
          />
          <Form.Input
            placeholder='Category amount'
            name='amount'
            type='number'
            onChange={onChange}
            value={values.amount}
          />

          <Button type='submit' color='teal'>
            Add Category
          </Button>
        </Form.Field>
      </Form>
    </div>
  );
}

const CREATE_CATEGORY_MUTATION = gql`
  mutation addCategory($name: String!, $price: String!, $amount: String!) {
    addCategory(
      addCategoryInput: { name: $name, price: $price, amount: $amount }
    ) {
      id
      name
      price
      amount
      createdAt
      purchases {
        id
        date
        name
      }
    }
  }
`;
export default AddCategoryForm;
