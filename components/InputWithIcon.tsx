"use client";

import React, { ReactNode, useId } from "react";
import {
  TextField,
  InputAdornment,
  Box,
  Typography,
  TextFieldProps,
} from "@mui/material";
import { Theme as CustomTheme } from "@/theme/theme";

type InputWithIconProps = Omit<TextFieldProps, "variant" | "label"> & {
  label: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export default function InputWithIcon({
  label,
  leftIcon,
  rightIcon,
  error,
  helperText,
  id: providedId,
  ...props
}: InputWithIconProps) {
  const generatedId = useId();
  const id = providedId || generatedId;

  return (
    <Box sx={{ width: "100%", mb: 2 }}>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          color: CustomTheme.colors.g500,
          display: "block",
          mb: 0.5,
          ml: 0.5,
        }}
        htmlFor={id}
        component="label"
      >
        {label}
      </Typography>
      <TextField
        {...props}
        id={id}
        variant="outlined"
        fullWidth
        error={error}
        helperText={helperText}
        slotProps={{
          input: {
            startAdornment: leftIcon ? (
              <InputAdornment position="start">
                <Box
                  sx={{
                    color: CustomTheme.colors.g100,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {leftIcon}
                </Box>
              </InputAdornment>
            ) : null,
            endAdornment: rightIcon ? (
              <InputAdornment position="end">
                <Box
                  sx={{
                    color: CustomTheme.colors.g100,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {rightIcon}
                </Box>
              </InputAdornment>
            ) : null,
            sx: {
              bgcolor: "#C0C0C0",
              borderRadius: 3,
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&:hover": {
                bgcolor: "#D1D1D1",
              },
              "&.Mui-focused": {
                bgcolor: "#D1D1D1",
              },
             "& input": {
                py: 1.2,
                fontSize: CustomTheme.fontSize.textM, 
                color: CustomTheme.colors.g500,
                "&::placeholder": {
                  color: CustomTheme.colors.g100,
                  opacity: 1,
                  fontSize: CustomTheme.fontSize.textM, 
                },
                "&:-webkit-autofill": {
                  WebkitBoxShadow: `0 0 0 100px #C0C0C0 inset`,
                  WebkitTextFillColor: CustomTheme.colors.g500,
                  borderRadius: "inherit",
                },
              },
            },
          },
        }}
      />
    </Box>
  );
}
