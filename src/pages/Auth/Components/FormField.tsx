import { theme } from '@/theme';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextFieldProps,
} from '@mui/material';
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
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const passwordProps = {
    type: showPassword ? 'text' : 'password',
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    ),
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
        <InputLabel htmlFor={`outlined-adornment-${label}`}>
          {label} {required && '*'}
        </InputLabel>
        <span style={{ color: theme.palette.error.main, fontSize: '14px', textAlign: 'end' }}>
          {error}
        </span>
        <OutlinedInput
          error={!!error}
          id={`outlined-adornment-${label}`}
          label={label}
          {...field}
          disabled={disabled}
          {...(type === 'password'
            ? passwordProps
            : {
                type: type,
              })}
        />
      </FormControl>
    </div>
  );
};

FormField.displayName = 'FormField';

export default FormField;
