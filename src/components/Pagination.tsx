import React from 'react';
import { Box, Button, Select, Option } from '@mui/joy';

interface PaginationProps {
  gotoPage: (page: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageCount: number;
  pageIndex: number;
  pageOptions: number[];
  pageSize: number;
  setPageSize: (size: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  gotoPage,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex,
  pageOptions,
  pageSize,
  setPageSize,
}) => {

  return (
    <Box className="pagination mt-4 flex flex-col sm:flex-row items-center justify-between">
      <Box className="flex items-center mb-2 sm:mb-0">
        <Button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className={`px-3 py-1 rounded-md bg-gray-200 text-gray-700 mr-2 disabled:opacity-50`}
        >
          {'<<'}
        </Button>
        <Button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className={`px-3 py-1 rounded-md bg-gray-200 text-gray-700 mr-2 disabled:opacity-50`}
        >
          {'<'}
        </Button>
        <Button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className={`px-3 py-1 rounded-md bg-gray-200 text-gray-700 mr-2 disabled:opacity-50`}
        >
          {'>'}
        </Button>
        <Button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className={`px-3 py-1 rounded-md bg-gray-200 text-gray-700 mr-2 disabled:opacity-50`}
        >
          {'>>'}
        </Button>
      </Box>
      <span className={`text-sm text-gray-700 mb-2 sm:mb-0`}>
        Page{' '}
        <strong className="font-medium">
          {pageIndex + 1} of {pageOptions.length}
        </strong>{' '}
      </span>
      <Select
        value={pageSize}
        onChange={e => {
          setPageSize(Number(e.target.value));
        }}
        className={`mt-2 sm:mt-0 block w-full sm:w-auto px-3 py-1 bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
      >
        {[10, 20, 30, 40, 50].map(pageSize => (
          <Option key={pageSize} value={pageSize}>
            Show {pageSize}
          </Option>
        ))}
      </Select>
    </Box>
  );
};

export default Pagination;