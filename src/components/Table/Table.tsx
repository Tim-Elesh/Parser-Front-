import React, { useState, useMemo, useEffect } from 'react';
import { useTable, usePagination, useSortBy, Column } from 'react-table';
import TableData from '../../types/TableData';
import Accordion from '../Accordion';
import { useStore } from '../../store/store';
import { FaArrowUp, FaArrowDown, FaArrowsAltV, FaArrowRight } from "react-icons/fa";
import Pagination from '../Pagination';

const Table: React.FC<{ data: TableData[]; searchQuery: string; }> = ({ data, searchQuery }) => {
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
  
      <div className="min-w-full lg:w-full h-96 overflow-y-auto">
        <table {...getTableProps()} className={`min-w-full table-fixed divide-y ${theme === 'dark' ? 'divide-gray-700 bg-dark text-white' : 'divide-gray-200 bg-white text-black'}`}>
          <thead className={`${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={`w-1/4 px-2 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? "text-white" : "text-gray-500"}`}
                  >
                    <div className="flex items-center">
                      {column.render('Header')}
                      <span className="text-gray-500 ml-2">
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
                  {row.original.isGroup ? (
                    <React.Fragment>
                      <tr>
                        <td className='flex items-center cursor-pointer' onClick={() => setOpenGroupIndex(openGroupIndex === row.index ? null : row.index)} colSpan={columns.length}>
                          <Accordion title={row.original.model}>
                            {openGroupIndex === row.index && row.original.groupItems.map((item, subIndex) => (
                              <div key={subIndex} className="py-2">
                                <div className="flex justify-between gap-6">
                                  <span className='w-1/5'>{item.model}</span>
                                  <span className='w-1/5'>{item.provider}</span>
                                  <span className='w-1/5'>{item.input}</span>
                                  <span className='w-1/5'>{item.output}</span>
                                </div>
                              </div>
                            ))}
                          </Accordion>
                          <span className="ml-2">
                            {openGroupIndex === row.index ? <FaArrowDown /> : <FaArrowRight />}
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
  
      <Pagination
        gotoPage={gotoPage}
        previousPage={previousPage}
        nextPage={nextPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </div>
  );
  

};

export default Table;