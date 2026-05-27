import { theme } from '@/theme';
import { TextField, TextFieldProps, Typography } from '@mui/material';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormFieldProps {
  error?: string;
  required?: boolean;
  label: string;
  field: UseFormRegisterReturn;
  disabled?: boolean;
  type?: TextFieldProps['type'];
}

const FormField: React.FC<FormFieldProps> = ({ field, label, error, required, type, disabled }) => {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        {label}
        {required && '*'}{' '}
        <span style={{ color: theme.palette.error.main, fontSize: '14px' }}>{error}</span>
      </Typography>
      <TextField type={type} {...field} disabled={disabled} />
    </div>
  );
};

FormField.displayName = 'FormField';

export default FormField;
