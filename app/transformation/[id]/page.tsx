"use client";

import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { useTransactionDetail } from "@/hooks/useTransactionDetail";
import { TransactionCard } from "@/components/TransactionCard";
import { TransactionLoading } from "@/components/dashboard/TransactionLoading";
import { Theme } from "@/theme/theme";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function TransformationPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const txUuid = resolvedParams.id;
  const { data, isLoading, error } = useTransactionDetail(txUuid);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: Theme.colors.v75,
        pt: 4,
        pb: 8,
        px: { xs: 2, sm: 4 },
      }}
    >
      <Stack sx={{ mb: 4, alignItems: "center", gap: 0.5 }}>
        <Typography sx={{ fontSize: { xs: Theme.fontSize.h4, md: Theme.fontSize.h3 }, fontWeight: 700 }}>
          Solpay Transformation
        </Typography>

        {!isLoading && data && (
          <Typography
            sx={{
              fontSize: { xs: Theme.fontSize.h4, md: Theme.fontSize.h3 },
              fontWeight: 700,
              color: Theme.colors.v400,
              textTransform: "lowercase",
            }}
          >
            {data.transaction_type}
          </Typography>
        )}
      </Stack>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {isLoading ? (
          <TransactionLoading height="300px" />
        ) : error ? (
          <Box sx={{ mt: 4 }}>
            <Typography color="error" variant="body1">
              {error}
            </Typography>
          </Box>
        ) : (
          data && <TransactionCard data={data} />
        )}
      </Box>
    </Box>
  );
}
