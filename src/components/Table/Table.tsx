import React, { useState, useMemo, useEffect } from 'react';
import { useTable, usePagination, useSortBy, Column } from 'react-table';
import TableData from '../../types/TableData';
import Search from '../SearchableTable/Search';
import Accordion from '../Accordion';
import { useStore } from '../../store/store';

const Table: React.FC<{ data: TableData[] }> = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useStore((state: { theme: any; }) => state.theme);

  useEffect(() => {
    console.log('Table data:', data);
  }, [data]);

  // Функция для поиска дубликатов
  const findDuplicates = (data: TableData[]) => {
    const duplicates: Record<string, TableData[]> = {};
    const uniqueData: TableData[] = [];

    data.forEach(row => {
      const key = `${row.model}`;

      if (!duplicates[key]) {
        duplicates[key] = [];
        uniqueData.push(row);
      }

      duplicates[key].push(row);
    });

    return {
      duplicates: Object.values(duplicates).filter(group => group.length > 1),
      uniqueData,
    };
  };

  const { duplicates, uniqueData } = useMemo(() => findDuplicates(data), [data]);

  const filteredData = useMemo(() => {
    return uniqueData.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [uniqueData, searchQuery]);

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
        <table {...getTableProps()} className={`min-w-full divide-y ${theme === 'dark' ? 'divide-gray-700 bg-dark text-white' : 'divide-gray-200 bg-white text-black'}`}>
          <thead className={`${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={`px-2 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? "text-white" : "text-gray-500"}`}
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
          <tbody {...getTableBodyProps()} className={`${theme === 'dark' ? "bg-black" : "bg-white"}`}>
            {page.map((row: any) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className={`${theme === 'dark' ? "hover:bg-gray-200 duration-200" : "hover:bg-gray-100 duration-200"}`}>
                  {row.cells.map((cell: any) => (
                    <td
                      {...cell.getCellProps()}
                      className={`px-2 py-1.5 sm:px-4 md:px-6 sm:py-2 text-xs sm:text-sm ${theme === 'dark' ? "text-white hover:text-gray-900" : "text-gray-900"}`}
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}

            {/* Accordion для отображения дубликатов */}
            {duplicates.map((duplicateGroup, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td colSpan={columns.length}>
                    {/* Передаем название группы как название модели */}
                    <Accordion title={`Group: ${duplicateGroup[0].model}`}>
                      {duplicateGroup.map((item, subIndex) => (
                        <tr key={subIndex} className="light:bg-white dark:bg-black dark:text-white text-sm flex gap-48">
                          <td className="pl-6 pr-[24%] w-full flex gap-12 justify-between py-4 whitespace-nowrap hover:bg-gray-100 duration-200">
                            <tr>
                              {item.model}
                            </tr>
                            <tr>
                              {item.provider}
                            </tr>
                            <tr>
                              {item.input}
                            </tr>
                            <tr>
                              {item.output}
                            </tr>
                          </td>
                        </tr>
                      ))}
                    </Accordion>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination mt-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-2 sm:mb-0">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className={`px-3 py-1 rounded-md ${theme === 'dark' ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-700"} mr-2 disabled:opacity-50`}
          >
            {'<<'}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className={`px-3 py-1 rounded-md ${theme === 'dark' ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-700"} mr-2 disabled:opacity-50`}
          >
            {'<'}
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={`px-3 py-1 rounded-md ${theme === 'dark' ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-700"} mr-2 disabled:opacity-50`}
          >
            {'>'}
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className={`px-3 py-1 rounded-md ${theme === 'dark' ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-700"} mr-2 disabled:opacity-50`}
          >
            {'>>'}
          </button>
        </div>
        <span className={`text-sm ${theme === 'dark' ? "text-white" : "text-gray-700"} mb-2 sm:mb-0`}>
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
          className={`mt-2 sm:mt-0 block w-full sm:w-auto px-3 py-1 ${theme === 'dark' ? "bg-black border-gray-800" : "bg-white border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
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