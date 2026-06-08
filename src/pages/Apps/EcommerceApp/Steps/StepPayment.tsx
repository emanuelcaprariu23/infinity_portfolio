import { CreditCard, Lock } from '@mui/icons-material';
import { Box, Divider, Paper, Typography } from '@mui/material';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import FormField from '../../../Auth/Components/FormField';
import { CheckoutFormData, MOCK_CART_ITEMS } from './checkoutSchema';

interface StepPaymentProps {
  register: UseFormRegister<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
}

const orderTotal = MOCK_CART_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0);

const StepPayment: React.FC<StepPaymentProps> = ({ register, errors }) => {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <CreditCard color="primary" />
        <Typography variant="h6" fontWeight="medium">
          Card Details
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto' }}>
          <Lock sx={{ fontSize: 14, color: 'text.secondary' }} />
          <Typography variant="caption" color="text.secondary">
            Secure Payment
          </Typography>
        </Box>
      </Box>

      <FormField
        label="Cardholder Name"
        field={register('cardHolder')}
        error={errors.cardHolder?.message}
        required
      />

      <FormField
        label="Card Number (16 digits)"
        field={register('cardNumber')}
        error={errors.cardNumber?.message}
        required
      />

      <FormField
        label="Expiry Date (MM/YY)"
        field={register('expiryDate')}
        error={errors.expiryDate?.message}
        required
      />

      <FormField
        label="CVV"
        field={register('cvv')}
        error={errors.cvv?.message}
        required
        type="password"
      />

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom fontWeight="medium">
        Order Summary
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        {MOCK_CART_ITEMS.map(item => (
          <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {item.name} × {item.quantity}
            </Typography>
            <Typography variant="body2">${(item.price * item.quantity).toFixed(2)}</Typography>
          </Box>
        ))}
        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Total
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold" color="primary.main">
            ${orderTotal.toFixed(2)}
          </Typography>
        </Box>
      </Paper>
    </>
  );
};

StepPayment.displayName = 'StepPayment';

export default StepPayment;
