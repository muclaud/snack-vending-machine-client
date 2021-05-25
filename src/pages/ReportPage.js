import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Grid } from 'semantic-ui-react';
import ReportTable from '../components/ReportTable';

function ReportPage() {
  const { loading, data: { getAllPurchases: purchases } = {} } = useQuery(
    FETCH_PURCHASES_QUERY
  );

  return (
    <Container>
      <Grid.Row>
        <h2>All purchases</h2>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>loading purchases...</h1>
        ) : (
          <ReportTable purchases={purchases} />
        )}
      </Grid.Row>
    </Container>
  );
}

const FETCH_PURCHASES_QUERY = gql`
  query getAllPurchases {
    getAllPurchases {
      id
      date
      name
      price
    }
  }
`;

export default ReportPage;
