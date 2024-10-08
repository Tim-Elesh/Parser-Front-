/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useEffect } from 'react';
import { useTable, usePagination, useSortBy, Column, Row, HeaderGroup, TableInstance } from 'react-table';
import TableData from '../../types/TableData';
import { ArrowUpward, ArrowDownward , Height} from '@mui/icons-material'
import Pagination from '../Pagination';

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

const Table: React.FC<{ data: TableData[]; searchQuery: string; hiddenColumns: string[] }> = ({ data, searchQuery, hiddenColumns }) => {

  useEffect(() => {
    console.log('Table data:', data);
  }, [data]);

  const truncateModelName = (name: string) => {
    return name.length > 10 ? name.substring(0, 10) + '...' : name;
  };

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

  const visibleColumns = useMemo(() => {
    return columns.filter(column => !hiddenColumns.includes(column.accessor as string));
  }, [columns, hiddenColumns]);

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
      columns: visibleColumns,
      data: combinedData,
      initialState: { pageIndex: 0, pageSize: 10 }, // Дополнительно добавленный multiSort после настройки
      disableMultiSort: false, // Включение многоколоночной сортировки
    },
    useSortBy,
    usePagination
  ) as TableInstanceWithPagination<GroupedTableData>;

  return (
    <div className="overflow-x-hidden">
      <div className="min-w-full lg:w-full xl:w-2xl 2xl:w-1/2 h-96 overflow-y-auto"> {/* This div controls vertical scroll */}
        <table {...getTableProps()} className={`min-w-full max-[768px]:w-full lg:w-full lg:max-w-2xl xl:w-full xl:max-w-3xl 2xl:w-full 2xl:max-w-4xl table-fixed divide-y divide-gray-200 bg-white text-black`}>
          <thead className={`bg-gray-50 sticky top-0`}> {/* Make header sticky */}
            {headerGroups.map((headerGroup: HeaderGroup<GroupedTableData>) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => {
                  const sortingColumn = column as Column<GroupedTableData> & UseSortByColumnProps<GroupedTableData>;
                  return (
                    <th
                      {...sortingColumn.getHeaderProps(sortingColumn.getSortByToggleProps())}
                      className={`w-1/4 px-1 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-semibold uppercase text-gray-500`}
                    >
                      <div className="flex items-center">
                        {sortingColumn.render('Header')}
                        <span className="text-gray-500 ml-0 sm:ml-2 md:ml-2 lg:ml-2 xl:ml-2 2xl:ml-2">
                          {sortingColumn.isSorted
                            ? sortingColumn.isSortedDesc
                              ? <ArrowDownward  />
                              : <ArrowUpward />
                            : <Height />}
                        </span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className={` bg-white`}>
            {page.map((row: Row<GroupedTableData>) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className={` hover:bg-gray-100 duration-200 `}>
                  {row.cells.map(cell => {
                    const cellValue = cell.column.id === 'model' ? truncateModelName(cell.value) : cell.render('Cell');
                    return (
                      <td
                        {...cell.getCellProps()}
                        className={`px-2 py-1.5 sm:px-4 md:px-6 sm:py-2 text-xs sm:text-sm text-gray-900`}
                      >
                        {cellValue}
                      </td>
                    );
                  })}
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
}

export default Table;