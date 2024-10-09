import { useMemo, useEffect } from "react";
import {
  useTable,
  useSortBy,
  Column,
  Row,
  HeaderGroup,
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

const TableComponent: React.FC<{
  data: TableData[];
  searchQuery: string;
  hiddenColumns: string[];
}> = ({ data, searchQuery, hiddenColumns }) => {
  useEffect(() => {
    console.log("Table data:", data);
  }, [data]);

  const palette = useColorScheme();
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: visibleColumns,
        data: combinedData,
        initialState: { pageIndex: 0 }, 
        disableMultiSort: false,
      },
      useSortBy
    );

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
            minWidth: "100%",
            maxWidth: {
              xs: "100%",
              lg: "672px",
              xl: "768px",
              "2xl": "1024px",
              "3xl": "1270px"
            },
            tableLayout: "fixed",
            borderCollapse: "collapse",
            backgroundColor: isDarkMode ? "black" : "white",
            color: isDarkMode ? "white" : "black",
          }}
        >
          <Box
            component="thead"
            sx={{
              backgroundColor: "grey.50",
              position: "sticky",
              top: 0,
              zIndex: 1,
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
                        width: "25%",
                        paddingX: {
                          xs: "4px",
                          sm: "16px",
                          md: "24px",
                        },
                        paddingY: {
                          xs: "8px",
                          sm: "12px",
                        },
                        textAlign: "left",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        color: "grey.500",
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
                            color: "grey.500",
                            marginLeft: {
                              xs: 0,
                              sm: "8px",
                              md: "8px",
                              lg: "8px",
                              xl: "8px",
                              "2xl": "8px",
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
            {rows.map((row: Row<GroupedTableData>) => {
              prepareRow(row);
              return (
                <Box
                  component="tr"
                  {...row.getRowProps()}
                  sx={{
                    "&:hover": {
                      backgroundColor: "grey.100",
                    },
                    transition: "background-color 200ms ease-in-out",
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
                            xs: "8px",
                            sm: "16px",
                            md: "24px",
                          },
                          paddingY: {
                            xs: "6px",
                            sm: "8px",
                          },
                          fontSize: {
                            xs: "0.75rem",
                            sm: "0.875rem",
                          },
                          color: "grey.900",
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