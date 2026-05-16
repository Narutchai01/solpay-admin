"use client";

import React, { useState } from "react";
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
  PaginationProps,
  Typography,
  Tooltip,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Theme } from "@/theme/theme";

export interface Column<T> {
  id: keyof T | string;
  label: string;
  width?: number;
  renderCell?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowsPerPage?: number;
  emptyMessage?: string;
}

const formatTooltipValue = (value: unknown): string => {
  const str = String(value || "");

  let normalized = str;
  if (str.includes("e+") || str.includes("e-")) {
    try {
      normalized = BigInt(Math.round(Number(str))).toString();
    } catch {
      return str;
    }
  }

  const num = Number(normalized);
  if (!isNaN(num) && normalized.trim() !== "") {
    return num.toLocaleString("en-US");
  }

  return normalized;
};

export function TableComponent<T extends { id: string | number }>({
  columns,
  data = [],
  rowsPerPage = 10,
  emptyMessage = "No data available",
}: DataTableProps<T>) {
  const headerCellSx = {
    color: "white",
    fontSize: Theme.fontSize.h7,
    fontWeight: 700,
    whiteSpace: "nowrap" as const,
  };

  const bodyCellSx = {
    color: Theme.colors.g500,
    fontSize: Theme.fontSize.textS,
    width: 320,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
  };

  const safeData = Array.isArray(data) ? data : [];

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(safeData.length / rowsPerPage);

  const paginatedData = safeData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  const handlePageChange: PaginationProps["onChange"] = (_, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "none",
          border: `1px solid ${Theme.colors.g50}`,
          borderRadius: 4,
          overflowX: "auto",
        }}
      >
        <Table sx={{ minWidth: 650, tableLayout: "fixed" }}>
          <TableHead>
            <TableRow sx={{ bgcolor: Theme.colors.purple }}>
              {columns.map((col) => (
                <TableCell
                  key={String(col.id)}
                  sx={{ ...headerCellSx, width: col.width }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table Data */}
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  sx={{ height: 300, borderBottom: "none" }}
                >
                  <Typography
                    variant="h5"
                    sx={{ color: Theme.colors.g75, fontWeight: 500 }}
                  >
                    {emptyMessage}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:hover": { bgcolor: Theme.colors.g50 } }}
                >
                  {columns.map((col) => {
                    const rawValue = formatTooltipValue(row[col.id as keyof T]);
                    return (
                      <TableCell
                        key={String(col.id)}
                        sx={{ ...bodyCellSx, width: col.width }}
                      >
                        <Tooltip
                          title={rawValue}
                          placement="top-start"
                          slotProps={{
                            tooltip: {
                              sx: {
                                maxWidth: 300,
                                wordBreak: "break-all",
                              },
                            },
                          }}
                        >
                          <span>
                            {col.renderCell ? col.renderCell(row) : rawValue}
                          </span>
                        </Tooltip>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Custom Pagination */}
      {totalPages > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 1,
          }}
        >
          <Button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            startIcon={<ArrowBackIcon fontSize="small" />}
            sx={{
              textTransform: "none",
              color: Theme.colors.g500,
              fontSize: Theme.fontSize.textM,
              fontWeight: 600,
              "&:hover": { bgcolor: "transparent" },
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
              "& .MuiPaginationItem-root": {
                minWidth: "28px",
                height: "28px",
                width: "28px",
                margin: "0 2px",
                borderRadius: "6px",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: Theme.colors.g500,
                "&.Mui-selected": {
                  bgcolor: Theme.colors.g200,
                  color: "white",
                  "&:hover": { bgcolor: Theme.colors.g200 },
                },
              },
            }}
          />

          <Button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            endIcon={<ArrowForwardIcon fontSize="small" />}
            sx={{
              textTransform: "none",
              color: Theme.colors.g500,
              fontSize: Theme.fontSize.textM,
              fontWeight: 600,
              "&:hover": { bgcolor: "transparent" },
            }}
          >
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
}
