import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';

import { Button, Table } from 'semantic-ui-react';

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

function CategoryTable(props) {
  const category = props.category;
  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: category,
    direction: null,
  });
  const { column, data, direction } = state;

  return (
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
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'amount' })}
          >
            Amount
          </Table.HeaderCell>
          <Table.HeaderCell>Details</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(({ price, amount, name, id }) => (
          <Table.Row key={id}>
            <Table.Cell>
              <h3>{name}</h3>
            </Table.Cell>
            <Table.Cell>
              <h3>{price}</h3>
            </Table.Cell>
            <Table.Cell>
              <h3>{amount}</h3>
            </Table.Cell>
            <Table.Cell>
              <Button as={Link} to={`/category/${id}`} color='teal'>
                More options
              </Button>
              {amount > 0 ? '' : <DeleteButton categoryId={id} />}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export default CategoryTable;
