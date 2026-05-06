"use client";

import React, { useMemo } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { TableComponent, Column } from "@/components/dashboard/Table";
import { TransactionLoading } from "@/components/dashboard/TransactionLoading";
import { Theme as CustomTheme } from "@/theme/theme";
import { useUser } from "@/hooks/useUser"; 
import { UserDetail } from "@/types/user";

export default function ApproveUserPage() {
  const { users, isLoading, isUpdating, updateStatus } = useUser();

  const columns = useMemo<Column<UserDetail>[]>(
    () => [
      {
        id: "id",
        label: "User ID",
        renderCell: (row) => row.id,
      },
      {
        id: "fullName",
        label: "Full Name",
        renderCell: (row) => `${row.first_name} ${row.last_name}`,
      },
      {
        id: "registrationDate",
        label: "Registration Date",
        renderCell: (row) =>
          new Date(row.birth_date).toLocaleString("en-US"), 
      },
      {
        id: "actions",
        label: "Actions",
        renderCell: (row) => (
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              size="small"
              onClick={() => updateStatus(row.id_card, "APPROVED")}
              disabled={isUpdating}
              sx={{
                bgcolor: CustomTheme.colors.success,
                color: CustomTheme.colors.surface,
                fontWeight: 700,
                borderRadius: 3,
                textTransform: "none",
                "&:hover": { bgcolor: CustomTheme.colors.success, opacity: 0.8},
              }}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={() => updateStatus(row.id_card, "REJECTED")}
              disabled={isUpdating}
              sx={{
                bgcolor: CustomTheme.colors.errorText ,
                color: CustomTheme.colors.surface,
                fontWeight: 700,
                borderRadius: 3,
                textTransform: "none",
                "&:hover": { bgcolor: CustomTheme.colors.errorText, opacity: 0.8},
              }}
            >
              Reject
            </Button>
          </Stack>
        ),
      },
    ],
    [isUpdating, updateStatus], 
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h1" sx={{ fontWeight: 700 }}>
          User Approvals
        </Typography>
      </Box>

    <Box sx={{ position: "relative", minHeight: "400px" }}>
        {isLoading ? (
          <TransactionLoading />
        ) : (
          <TableComponent 
            columns={columns} 
            data={users} 
            rowsPerPage={10} 
            emptyMessage="No pending approvals"
          />
        )}
      </Box>
    </Box>
  );
}