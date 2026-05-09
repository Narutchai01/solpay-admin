import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { TransactionDetail, TransactionType } from "@/types/transaction";
import { Theme } from "@/theme/theme";

export const TransactionCard = ({ data }: { data: TransactionDetail }) => {
  const isOnChain = data.transaction_type === TransactionType.ONCHAIN;

  const formatAddress = (str?: string, start = 7, end = 7) => {
    if (!str) return "-";
    if (str.length <= start + end) return str;
    return `${str.slice(0, start)}.....${str.slice(-end)}`;
  };

  return (
    <Box
      sx={{
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        borderRadius: "24px",
        border: "1px solid rgba(0, 0, 0, 0.05)",
        p: 3,
        color: Theme.colors.onSurface,
        boxShadow: `
          0px 4px 20px rgba(0, 0, 0, 0.03),
          0px 12px 40px rgba(0, 0, 0, 0.06)
        `,
        width: "100%",
        maxWidth: "450px",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: Theme.fontSize.textS, md: Theme.fontSize.textM },
          opacity: 0.5,
          display: "block",
          mb: 2,
        }}
      >
        {new Date(data.created_at).toLocaleString('en-US')}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 3 }}>
        <DetailRow
          label="Transaction ID"
          value={formatAddress(data.transaction_uuid)}
        />
        <DetailRow
          label="From Public Address"
          value={formatAddress(data.account?.public_address)}
        />
        <DetailRow
          label="To PromptPay"
          value={data.transaction_off_chain?.prompt_pay_id}
        />
      </Box>

      <Divider sx={{ my: 2, opacity: 0.5 }} />

      <Box sx={{ my: 3 }}>
        <Typography
          sx={{
            fontSize: { xs: Theme.fontSize.textM, md: Theme.fontSize.textL},
            opacity: 0.6,
            fontWeight: 500,
          }}
        >
          Total Amount
        </Typography>
        <Typography
          sx={{ fontSize: {xs: Theme.fontSize.h4, md: Theme.fontSize.h3}, fontWeight: 800, color: Theme.colors.onSurface }}
        >
          {data.thb_amount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
          })}{" "}
          <Typography
            component="span"
            sx={{ fontSize: { xs: Theme.fontSize.textM, md: Theme.fontSize.textL }, fontWeight: 500 }}
          >
            THB
          </Typography>
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {isOnChain && (
          <>
            <DetailRow
              label="USDC Amount"
              value={`${data.usdt_amount.toLocaleString('en-US', { maximumFractionDigits: 6 })} USDC`}
            />
            <DetailRow
              label="Fee"
              value={`${data.fee.toLocaleString('en-US', { maximumFractionDigits: 6 })} USDC`}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <Typography
      sx={{ fontSize: { xs: Theme.fontSize.textS, md: Theme.fontSize.textM }, opacity: 0.6, fontWeight: 500 }}
    >
      {label}
    </Typography>
    <Typography
      sx={{
        fontSize: { xs: Theme.fontSize.textS, md: Theme.fontSize.textM },
        fontWeight: 600,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        textAlign: "right",
      }}
    >
      {value || "-"}
    </Typography>
  </Box>
);
