import React, { useState, useMemo, useEffect } from 'react';
import { useTable, usePagination, useSortBy, Column } from 'react-table';
import TableData from '../../types/TableData';
import Search from '../SearchableTable/Search';
import { useTheme } from '../../hooks/useTheme';

const Table: React.FC<{ data: TableData[] }> = ({ data }) => {
  const { isDark } = useTheme();
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
        <table {...getTableProps()} className={`min-w-full divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'} ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
          <thead className={isDark ? 'bg-gray-900' : 'bg-gray-50'}>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={`px-2 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}
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
          <tbody {...getTableBodyProps()} className={isDark ? 'bg-gray-800' : 'bg-white'}>
            {page.map((row: any) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className={isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}>
                  {row.cells.map((cell: any) => (
                    <td
                      {...cell.getCellProps()}
                      className={`px-2 py-1.5 sm:px-4 md:px-6 sm:py-2 text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'}`}
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
            className={`px-3 py-1 rounded-md ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} mr-2 disabled:opacity-50`}
          >
            {'<<'}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className={`px-3 py-1 rounded-md ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} mr-2 disabled:opacity-50`}
          >
            {'<'}
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={`px-3 py-1 rounded-md ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} mr-2 disabled:opacity-50`}
          >
            {'>'}
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className={`px-3 py-1 rounded-md ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} disabled:opacity-50`}
          >
            {'>>'}
          </button>
        </div>
        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2 sm:mb-0`}>
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
          className={`mt-2 sm:mt-0 block w-full sm:w-auto px-3 py-1 ${isDark ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
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


