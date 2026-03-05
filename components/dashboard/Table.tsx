import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
} from '@mui/material';
import { Theme } from '@/theme/theme';

export interface Column<T> {
  id: keyof T | string; 
  label: string;      
  renderCell?: (row: T) => React.ReactNode; 
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export function TableComponent<T extends { id: string | number }>({ columns, data }: DataTableProps<T>) {
  const headerCellSx = { color: 'white', fontSize: Theme.fontSize.h6, fontWeight: 600 };

  return (
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
          {data.map((row) => (
            <TableRow key={row.id} sx={{ '&:hover': { bgcolor: Theme.colors.g50 } }}>
              {columns.map((col) => (
                <TableCell key={String(col.id)} sx={{ color: Theme.colors.g500 }}>
                  {col.renderCell ? col.renderCell(row) : String(row[col.id as keyof T] || '')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}