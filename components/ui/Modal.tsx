'use client';

import React from "react";
import { Dialog, DialogContent, Typography, Box, Button } from "@mui/material";
import { Theme } from "@/theme/theme"; 

interface ConfirmModalProps {
  title: string;
  cancelLabel?: string;
  confirmLabel?: string;
  visible: boolean;
  onCancel?: () => void;
  onConfirm: () => void;
}

export const ModalComponent = ({
  title,
  cancelLabel,
  confirmLabel = "Confirm",
  visible,
  onCancel,
  onConfirm,
}: ConfirmModalProps) => {

  return (
    <Dialog 
      open={visible} 
      onClose={onCancel} 
      slotProps={{
        paper: {
          sx: {
            width: '100%',
            maxWidth: '350px', 
            backgroundColor: Theme.colors.surface,
            borderRadius: 3, 
            p: 3, 
          }
        }
      }}
    >
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 0, overflow: 'hidden' }}>
        
        {/* Title */}
        <Typography
          sx={{
            fontSize: Theme.fontSize.textXL,
            fontWeight: 700,
            color: Theme.colors.g300,
            textAlign: 'center',
            marginBottom: 3.5, 
          }}
        >
          {title}
        </Typography>

        {/* Buttons */}
        <Box sx={{ display: 'flex', gap: 1.5, width: '100%' }}>
          {onCancel && cancelLabel && (
            <Button
              variant="outlined"
              onClick={onCancel}
              fullWidth
              sx={{
                fontSize: Theme.fontSize.textM,
                borderColor: Theme.colors.v300,
                color: Theme.colors.v500,
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                py: 1,
              }}
            >
              {cancelLabel}
            </Button>
          )}

          <Button
            variant="contained"
            onClick={onConfirm}
            fullWidth
            sx={{
              fontSize: Theme.fontSize.textM,
              bgcolor: Theme.colors.v300,
              color: 'white',
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
              py: 1,
              '&:hover': {
                bgcolor: Theme.colors.v400, 
              }
            }}
          >
            {confirmLabel}
          </Button>
        </Box>

      </DialogContent>
    </Dialog>
  );
};