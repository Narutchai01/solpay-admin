'use client';

import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Box,
  Button,
  Pagination,
  PaginationProps
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Theme } from '@/theme/theme';

export interface Column<T> {
  id: keyof T | string; 
  label: string;      
  renderCell?: (row: T) => React.ReactNode; 
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowsPerPage?: number; 
}

export function TableComponent<T extends { id: string | number }>({ 
  columns, 
  data, 
  rowsPerPage = 10 
}: DataTableProps<T>) {
  const headerCellSx = { color: 'white', fontSize: Theme.fontSize.h6, fontWeight: 700 };

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginatedData = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

const handlePageChange: PaginationProps['onChange'] = (_, value) => {
  setPage(value);
};

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: `1px solid ${Theme.colors.g50}`, borderRadius: 4 }}>
        <Table sx={{ minWidth: 650 }}>
          {/* Header */}
          <TableHead>
            <TableRow sx={{ bgcolor: Theme.colors.purple }}>
              {columns.map((col) => (
                <TableCell key={String(col.id)} sx={headerCellSx}>
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table Data */}
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id} sx={{ '&:hover': { bgcolor: Theme.colors.g50 } }}>
                {columns.map((col) => (
                  <TableCell key={String(col.id)} sx={{ color: Theme.colors.g500, fontSize: Theme.fontSize.textL }}>
                    {col.renderCell ? col.renderCell(row) : String(row[col.id as keyof T] || '')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Custom Pagination */}
      {totalPages > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1 }}>
          <Button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            startIcon={<ArrowBackIcon fontSize="small"  />} 
            sx={{ 
              textTransform: 'none', 
              color: Theme.colors.g500, 
              fontSize: Theme.fontSize.textL,
              fontWeight: 600,
              '&:hover': { bgcolor: 'transparent', color: Theme.colors.g500 }
            }}
          >
            Previous
          </Button>

          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handlePageChange}
            hidePrevButton 
            hideNextButton
            shape="rounded" 
            sx={{
              '& .MuiPaginationItem-root': {
                fontSize: Theme.fontSize.textL,
                fontWeight: 600,
                color: Theme.colors.g500,
                '&.Mui-selected': {
                  bgcolor: Theme.colors.g200, 
                  color: 'white',
                  '&:hover': {
                    bgcolor: Theme.colors.g200,
                  }
                }
              }
            }}
          />

          <Button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            endIcon={<ArrowForwardIcon fontSize="small" />} 
            sx={{ 
              textTransform: 'none', 
              color: Theme.colors.g500,
              fontSize: Theme.fontSize.textL, 
              fontWeight: 600,
              '&:hover': { bgcolor: 'transparent', color: Theme.colors.g500 }
            }}
          >
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
}