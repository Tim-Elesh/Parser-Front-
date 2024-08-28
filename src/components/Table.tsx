import React from 'react';
import { useTable, Column } from 'react-table';

interface TableData {
  model: string;
  provider: string;
  input: string;
  output: string;
}

const Table: React.FC<{ data: TableData[] }> = ({ data }) => {
  const columns: Column<TableData>[] = React.useMemo(
    () => [
      {
        Header: 'Model',
        accessor: 'model' as const,
      },
      {
        Header: 'Provider',
        accessor: 'provider' as const,
      },
      {
        Header: 'Input',
        accessor: 'input' as const,
      },
      {
        Header: 'Output',
        accessor: 'output' as const,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 3px red',
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td
                  {...cell.getCellProps()}
                  style={{
                    padding: '10px',
                    border: 'solid 1px gray',
                    background: 'papayawhip',
                  }}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
