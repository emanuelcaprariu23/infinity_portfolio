import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import React from 'react';
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form';
import FormField from '../../../../Auth/Components/FormField';
import { CheckoutFormData, GENDER_OPTIONS } from './checkoutSchema';

interface StepUserDataProps {
  register: UseFormRegister<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
  control: Control<CheckoutFormData>;
}

const StepUserData: React.FC<StepUserDataProps> = ({ register, errors, control }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom fontWeight="medium">
        Personal Information
      </Typography>

      <FormField label="Full Name" field={register('name')} error={errors.name?.message} required />

      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" error={!!errors.gender}>
            <InputLabel id="gender-label">Gender *</InputLabel>
            <Select {...field} labelId="gender-label" label="Gender *">
              {GENDER_OPTIONS.map(option => (
                <MenuItem key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </MenuItem>
              ))}
            </Select>
            {errors.gender && <FormHelperText>{errors.gender.message}</FormHelperText>}
          </FormControl>
        )}
      />

      <FormField
        label="Age"
        field={register('age')}
        error={errors.age?.message}
        required
        type="number"
      />

      <FormField
        label="Email"
        field={register('email')}
        error={errors.email?.message}
        required
        type="email"
      />
    </>
  );
};

StepUserData.displayName = 'StepUserData';

export default StepUserData;
