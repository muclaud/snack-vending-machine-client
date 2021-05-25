import React from 'react';
import { Card, Grid } from 'semantic-ui-react';
import { useQuery, gql } from '@apollo/client';

import AddAmountButton from '../components/AddAmountButton';
import AddPurcheseButton from '../components/AddPurchesButton';
import moment from 'moment';

function SingleCategory(props) {
  const categoryId = props.match.params.categoryId;

  const { data: { getCategory } = {} } = useQuery(FETCH_PRODUCT_QUERY, {
    variables: {
      categoryId,
    },
  });

  let productMarkup;
  if (!getCategory) {
    productMarkup = <p>Loading category...</p>;
  } else {
    const { id, name, createdAt, price, purchases, amount } = getCategory;

    productMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Card fluid>
              <Card.Content>
                <Card.Header>
                  <h2>{name}</h2>
                </Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>
                  <h3>Price: {price}</h3>
                </Card.Description>
                <Card.Description>
                  <h3>Amount: {amount}</h3>
                </Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <AddAmountButton categoryId={id} />
                <AddPurcheseButton categoryId={id} name={name} price={price} />
              </Card.Content>
            </Card>
            {purchases.map((purchese) => (
              <Card fluid key={purchese.id}>
                <Card.Content>
                  <Card.Header>
                    {moment(purchese.date).format('MMM Do YY')}
                  </Card.Header>
                  <Card.Description>{purchese.price}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return productMarkup;
}

const FETCH_PRODUCT_QUERY = gql`
  query ($categoryId: ID!) {
    getCategory(categoryId: $categoryId) {
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
export default SingleCategory;
