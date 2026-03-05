import React from 'react';
import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';

export interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Dropdown({ 
  options, 
  value, 
  onChange 
}: CustomDropdownProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
  };

  return (
    <FormControl sx={{ minWidth: 120 }}>
      <Select
        value={value}
        onChange={handleChange}
        displayEmpty
        size="small"
        sx={{
          bgcolor: 'white',
          borderRadius: 2,
          '& .MuiSelect-select': {
            py: 1,
            px: 1.5,
            fontSize: '14px',
          }
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};