import React, { useState, useMemo, useEffect } from 'react';
import { useTable, usePagination, useSortBy, Column } from 'react-table';
import TableData from '../../types/TableData';
import Search from '../SearchableTable/Search';

const Table: React.FC<{ data: TableData[] }> = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    console.log('Table data:', data); // Лог для проверки данных
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [data, searchQuery]);

  const columns: Column<TableData>[] = useMemo(
    () => [
      { Header: 'Model', accessor: 'model' },
      { Header: 'Provider', accessor: 'provider' },
      { Header: 'Input', accessor: 'input' },
      { Header: 'Output', accessor: 'output' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="overflow-x-auto">
      <Search onSearch={(query) => setSearchQuery(query)} />

      {/* Table */}
      <div className="min-w-full lg:w-full">
        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
            {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td
                      {...cell.getCellProps()}
                      className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 whitespace-normal sm:whitespace-nowrap text-xs sm:text-sm text-gray-900"
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination mt-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-2 sm:mb-0">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 mr-2 disabled:opacity-50"
          >
            {'<<'}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 mr-2 disabled:opacity-50"
          >
            {'<'}
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 mr-2 disabled:opacity-50"
          >
            {'>'}
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            {'>>'}
          </button>
        </div>
        <span className="text-sm text-gray-700 mb-2 sm:mb-0">
          Page{' '}
          <strong className="font-medium">
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
          className="mt-2 sm:mt-0 block w-full sm:w-auto px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Table;


