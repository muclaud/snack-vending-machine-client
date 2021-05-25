import React from 'react';
import { useQuery } from '@apollo/client';
import { Container, Grid } from 'semantic-ui-react';

import CategoryTable from '../components/CategoryTable';
import CategoryForm from '../components/CategoryForm';
import { FETCH_CATEGORY_QUERY } from '../utils/graphql';

function Home() {
  const { loading, data: { getCategoryList: category } = {} } =
    useQuery(FETCH_CATEGORY_QUERY);

  return (
    <Container>
      <Grid columns={3}>
        <Container>
          <Grid.Row className='page-title'>
            <CategoryForm />
          </Grid.Row>
        </Container>
        <Grid.Row className='page-title'>
          <h1>Categories</h1>
        </Grid.Row>

        <Grid.Row>
          {loading ? (
            <h1>loading categoryes...</h1>
          ) : (
            <CategoryTable category={category} />
          )}
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default Home;
