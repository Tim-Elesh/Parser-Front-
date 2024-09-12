import React, { useState, useMemo, useEffect } from 'react';
import { useTable, usePagination, useSortBy, Column } from 'react-table';
import TableData from '../../types/TableData';
import Search from '../SearchableTable/Search';
import Accordion from '../Accordion';
import { useStore } from '../../store/store';
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowsAltV } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const Table: React.FC<{ data: TableData[] }> = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useStore((state: { theme: any; }) => state.theme);
  const [isOpen, setIsOpen] = useState(false); // Добавлено состояние для управления открытием группы
  const [openGroupIndex, setOpenGroupIndex] = useState<number | null>(null); // Изменено для отслеживания открытой группы

  useEffect(() => {
    console.log('Table data:', data);
  }, [data]);

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

  // Combine filtered data with duplicates for pagination
  const combinedData = useMemo(() => {
    const dataWithDuplicates = [...filteredData];

    duplicates.forEach(duplicateGroup => {
      // Добавляем только одну строку для группы
      dataWithDuplicates.push({
        model: `Group: ${duplicateGroup[0].model}`,
        provider: '',
        input: '',
        output: '',
        isGroup: true, // Помечаем как группу для рендеринга
        groupItems: duplicateGroup, // Храним элементы группы
      });
    });

    return dataWithDuplicates;
  }, [filteredData, duplicates]);

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
      data: combinedData,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="overflow-x-auto">
      <Search onSearch={(query) => setSearchQuery(query)} />

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
                    <div className="flex items-center"> {/* Обернуто в flex для выравнивания */}
                      {column.render('Header')}
                      <span className="text-gray-500 ml-2"> {/* Увеличено расстояние между заголовком и стрелочками */}
                        {column.isSorted
                          ? column.isSortedDesc
                            ? <FaArrowDown />
                            : <FaArrowUp />
                          : <FaArrowsAltV />}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className={`${theme === 'dark' ? "bg-black" : "bg-white"}`}>
            {page.map((row: any) => {
              prepareRow(row);
              return (
                <React.Fragment key={row.id}>
                  {/* Проверяем, является ли строка группой */}
                  {row.original.isGroup ? (
                    <React.Fragment>
                      <tr>
                        <td className='flex items-center cursor-pointer' onClick={() => setOpenGroupIndex(openGroupIndex === row.index ? null : row.index)} colSpan={columns.length}> {/* Изменено для управления открытием конкретной группы */}
                          <Accordion title={row.original.model}>
                            {/* Условие для отображения элементов группы только при открытии */}
                            {openGroupIndex === row.index && row.original.groupItems.map((item, subIndex) => ( // Изменено для проверки открытой группы
                              <div key={subIndex} className="py-2">
                                <div className="flex justify-between gap-6">
                                  <span>{item.model}</span>
                                  <span>{item.provider}</span>
                                  <span>{item.input}</span>
                                  <span>{item.output}</span>
                                </div>
                              </div>
                            ))}
                          </Accordion>
                          <span className="ml-2"> {/* Увеличено расстояние между стрелочкой и названием группы */}
                            {openGroupIndex === row.index ? <FaArrowDown /> : <FaArrowRight />} {/* Изменено для отображения стрелочки только для открытой группы */}
                          </span>
                        </td>
                      </tr>
                    </React.Fragment>
                  ) : (
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
                  )}
                </React.Fragment>
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