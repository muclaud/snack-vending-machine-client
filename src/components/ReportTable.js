import React from 'react';
import { Grid, Table } from 'semantic-ui-react';
import _ from 'lodash';

function exampleReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_SORT':
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === 'ascending' ? 'descending' : 'ascending',
        };
      }

      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: 'ascending',
      };
    default:
      throw new Error();
  }
}

function ReportTable(props) {
  const purchases = props.purchases;
  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: purchases,
    direction: null,
  });
  const { column, data, direction } = state;

  return (
    <Grid.Row>
      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'name' ? direction : null}
              onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'name' })}
            >
              Name
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'price' ? direction : null}
              onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'price' })}
            >
              Price
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'amount' ? direction : null}
              onClick={() =>
                dispatch({ type: 'CHANGE_SORT', column: 'amount' })
              }
            >
              Amount
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(({ id, name, price, date }) => (
            <Table.Row key={id}>
              <Table.Cell> {name}</Table.Cell>
              <Table.Cell>{price}</Table.Cell>
              <Table.Cell>{date}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Grid.Row>
  );
}

export default ReportTable;
