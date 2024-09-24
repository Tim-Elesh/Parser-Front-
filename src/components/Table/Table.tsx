import { useMemo, useEffect } from 'react';
import { useTable, usePagination, useSortBy, Column, Row, HeaderGroup, TableInstance, TableState } from 'react-table';
import TableData from '../../types/TableData';
import { useStore } from '../../store/store';
import { FaArrowUp, FaArrowDown, FaArrowsAltV } from "react-icons/fa";
import Pagination from '../Pagination';

//comment 2

interface GroupedTableData extends TableData {
  isGroup?: boolean;
  groupItems?: TableData[];
}

type TableInstanceWithPagination<T extends object> = TableInstance<T> & {
  page: Array<Row<T>>;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageOptions: number[];
  pageCount: number;
  gotoPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (size: number) => void;
  state: { pageIndex: number; pageSize: number };
};

const Table: React.FC<{ data: TableData[]; searchQuery: string; }> = ({ data, searchQuery }) => {
  const theme = useStore((state: { theme: any; }) => state.theme);

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

  const { uniqueData } = useMemo(() => findDuplicates(data), [data]);

  const filteredData = useMemo(() => {
    return uniqueData.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [uniqueData, searchQuery]);

  const combinedData = useMemo(() => {
    return filteredData; 
  }, [filteredData]);

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
      initialState: { pageIndex: 0, pageSize: 10 } as Partial<TableState<GroupedTableData> & { pageIndex: number; pageSize: number }>,
    },
    useSortBy,
    usePagination
  ) as TableInstanceWithPagination<GroupedTableData>;

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full lg:w-full h-96 overflow-y-auto">
        <table {...getTableProps()} className={`w-full table-fixed divide-y ${theme === 'dark' ? 'divide-gray-700 bg-dark text-white' : 'divide-gray-200 bg-white text-black'}`}>
          <thead className={`${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
            {headerGroups.map((headerGroup: HeaderGroup<GroupedTableData>) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => {
                  const sortingColumn = column as Column<GroupedTableData> & UseSortByColumnProps<GroupedTableData>;
                  return (
                    <th
                      {...sortingColumn.getHeaderProps(sortingColumn.getSortByToggleProps())}
                      className={`w-1/4 px-1 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? "text-white" : "text-gray-500"}`}
                    >
                      <div className="flex items-center">
                        {sortingColumn.render('Header')}
                        <span className="text-gray-500 ml-0 sm:ml-2 md:ml-2 lg:ml-2 xl:ml-2 2xl:ml-2">
                          {sortingColumn.isSorted
                            ? sortingColumn.isSortedDesc
                              ? <FaArrowDown />
                              : <FaArrowUp />
                            : <FaArrowsAltV />}
                        </span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className={`${theme === 'dark' ? "bg-black" : "bg-white"}`}>
            {page.map((row: Row<GroupedTableData>) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className={`${theme === 'dark' ? "hover:bg-gray-200 duration-200" : "hover:bg-gray-100 duration-200"}`}>
                  {row.cells.map(cell => (
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