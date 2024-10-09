import { useMemo, useEffect } from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  Column,
  Row,
  HeaderGroup,
  TableInstance,
} from "react-table";
import TableData from "../../types/TableData";
import { ArrowUpward, ArrowDownward, Height } from "@mui/icons-material";
import { Box } from "@mui/joy";
import Table from "@mui/joy/Table";
import { useColorScheme } from '@mui/joy/styles';


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

const TableComponent: React.FC<{
  data: TableData[];
  searchQuery: string;
  hiddenColumns: string[];
}> = ({ data, searchQuery, hiddenColumns }) => {
  useEffect(() => {
    console.log("Table data:", data);
  }, [data]);

  const  palette  = useColorScheme();
  const isDarkMode = palette?.mode === 'dark';

  const truncateModelName = (name: string) => {
    return name.length > 10 ? name.substring(0, 10) + "..." : name;
  };

  const findDuplicates = (data: TableData[]) => {
    const duplicates: Record<string, TableData[]> = {};
    const uniqueData: TableData[] = [];

    data.forEach((row) => {
      const key = `${row.model}`;

      if (!duplicates[key]) {
        duplicates[key] = [];
        uniqueData.push(row);
      }

      duplicates[key].push(row);
    });

    return {
      duplicates: Object.values(duplicates).filter((group) => group.length > 1),
      uniqueData,
    };
  };

  const { uniqueData } = useMemo(() => findDuplicates(data), [data]);

  const filteredData = useMemo(() => {
    return uniqueData.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [uniqueData, searchQuery]);

  const combinedData = useMemo(() => {
    return filteredData;
  }, [filteredData]);

  const columns: Column<TableData>[] = useMemo(
    () => [
      { Header: "Model", accessor: "model" },
      { Header: "Provider", accessor: "provider" },
      { Header: "Input", accessor: "input", sortType: "basic" },
      { Header: "Output", accessor: "output", sortType: "basic" },
    ],
    []
  );

  const visibleColumns = useMemo(() => {
    return columns.filter(
      (column) => !hiddenColumns.includes(column.accessor as string)
    );
  }, [columns, hiddenColumns]);

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable(
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
    <Box
      sx={{
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          minWidth: "100%",
          height: "24rem",
          overflowY: "auto",
          width: {
            lg: "100%",
            xl: "768px",
            "2xl": "50%",
          },
        }}
      >
        <Table
          {...getTableProps()}
          sx={{
            minWidth: "100%", // Аналогично `min-w-full`
            maxWidth: {
              xs: "100%", // `w-full` до 768px
              lg: "672px", // `lg:max-w-2xl` (2xl в Tailwind соответствует около 672px)
              xl: "768px", // `xl:max-w-3xl` (3xl в Tailwind около 768px)
              "2xl": "1024px", // `2xl:max-w-4xl` (4xl соответствует около 1024px)
            },
            tableLayout: "fixed", // `table-fixed`
            borderCollapse: "collapse",
            backgroundColor: isDarkMode ? "black" : "white", // `bg-white`
            color: isDarkMode ? "white" : "black", // `text-black`
          }}
        >
          <Box
            component="thead"
            sx={{
              backgroundColor: "grey.50", // `bg-gray-50` в Tailwind соответствует светло-серому цвету
              position: "sticky", // `sticky`
              top: 0, // `top-0`
              zIndex: 1, // Укажите zIndex, чтобы элемент находился на верхних уровнях наложения
            }}
          >
            {headerGroups.map((headerGroup: HeaderGroup<GroupedTableData>) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  const sortingColumn = column as Column<GroupedTableData> &
                    UseSortByColumnProps<GroupedTableData>;
                  return (
                    <th
                      {...sortingColumn.getHeaderProps(
                        sortingColumn.getSortByToggleProps()
                      )}
                      sx={{
                        width: "25%", // `w-1/4` соответствует 25% ширины
                        paddingX: {
                          xs: "4px", // `px-1` соответствует 4px
                          sm: "16px", // `sm:px-4` соответствует 16px
                          md: "24px", // `md:px-6` соответствует 24px
                        },
                        paddingY: {
                          xs: "8px", // `py-2` соответствует 8px
                          sm: "12px", // `sm:py-3` соответствует 12px
                        },
                        textAlign: "left", // Склонение текста влево `text-left`
                        fontSize: "0.75rem", // `text-xs` соответствует примерно 0.75rem или 12px
                        fontWeight: "600", // `font-semibold` обычно соответствует 600 в системе стилей
                        textTransform: "uppercase", // `uppercase` преобразует текст в верхний регистр
                        color: "grey.500", // `text-gray-500` в MUI будет примерно соответствовать `grey.500`
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {sortingColumn.render("Header")}
                        <Box
                          sx={{
                            color: "grey.500", // Соответствует `text-gray-500` для цвета текста
                            marginLeft: {
                              xs: 0, // `ml-0` для самых маленьких экранов
                              sm: "8px", // `sm:ml-2` это 8px отступ для экранов от 640px и выше (по умолчанию Tailwind)
                              md: "8px", // `md:ml-2` продолжает 8px для медиа-области от 768px и выше
                              lg: "8px", // `lg:ml-2` аналогично для больших экранов (от 1024px)
                              xl: "8px", // `xl:ml-2` для ещё больших дисплеев (от 1280px)
                              "2xl": "8px", // `2xl:ml-2` для разрешений от 1536px
                            },
                          }}
                        >
                          {sortingColumn.isSorted ? (
                            sortingColumn.isSortedDesc ? (
                              <ArrowDownward />
                            ) : (
                              <ArrowUpward />
                            )
                          ) : (
                            <Height />
                          )}
                        </Box>
                      </Box>
                    </th>
                  );
                })}
              </tr>
            ))}
          </Box>
          <Box
            component="tbody"
            {...getTableBodyProps()}
            sx={{
              bgColor: "white",
            }}
          >
            {page.map((row: Row<GroupedTableData>) => {
              prepareRow(row);
              return (
                <Box
                  component="tr"
                  {...row.getRowProps()}
                  sx={{
                    "&:hover": {
                      backgroundColor: "grey.100", // Фон при наведении
                    },
                    transition: "background-color 200ms ease-in-out", // Переход для эффекта наведения
                  }}
                >
                  {row.cells.map((cell) => {
                    const cellValue =
                      cell.column.id === "model"
                        ? truncateModelName(cell.value)
                        : cell.render("Cell");
                    return (
                      <Box
                        component="td"
                        {...cell.getCellProps()}
                        sx={{
                          paddingX: {
                            xs: "8px", // `px-2` соответствует 8px
                            sm: "16px", // `sm:px-4` соответствует 16px
                            md: "24px", // `md:px-6` соответствует 24px
                          },
                          paddingY: {
                            xs: "6px", // `py-1.5` соответствует 6px (1.5 * 4px)
                            sm: "8px", // `sm:py-2` соответствует 8px
                          },
                          fontSize: {
                            xs: "0.75rem", // `text-xs` соответствует примерно 0.75rem или 12px
                            sm: "0.875rem", // `sm:text-sm` соответствует примерно 0.875rem или 14px
                          },
                          color: "grey.900", // `text-gray-900` для черного текста с оттенком серого
                        }}
                      >
                        {cellValue}
                      </Box>
                    );
                  })}
                </Box>
              );
            })}
          </Box>
        </Table>
      </Box>
    </Box>
  );
};

export default TableComponent;
