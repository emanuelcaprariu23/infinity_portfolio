import { ShoppingCart } from '@mui/icons-material';
import { Box, Chip, Divider, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import FormField from '../../../Auth/Components/FormField';
import { CheckoutFormData, MOCK_CART_ITEMS } from './checkoutSchema';

interface StepAddressItemsProps {
  register: UseFormRegister<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
}

const cartTotal = MOCK_CART_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0);

const StepAddressItems: React.FC<StepAddressItemsProps> = ({ register, errors }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom fontWeight="medium">
        Shipping Address
      </Typography>

      <FormField
        label="Street Address"
        field={register('street')}
        error={errors.street?.message}
        required
      />

      <FormField label="City" field={register('city')} error={errors.city?.message} required />

      <FormField
        label="Country"
        field={register('country')}
        error={errors.country?.message}
        required
      />

      <FormField
        label="Zip Code"
        field={register('zipCode')}
        error={errors.zipCode?.message}
        required
      />

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <ShoppingCart color="primary" />
        <Typography variant="h6" fontWeight="medium">
          Cart Items
        </Typography>
        <Chip
          label={`${MOCK_CART_ITEMS.length} items`}
          size="small"
          color="primary"
          variant="outlined"
        />
      </Box>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <List dense disablePadding>
          {MOCK_CART_ITEMS.map((item, index) => (
            <React.Fragment key={item.id}>
              <ListItem disableGutters>
                <ListItemText primary={item.name} secondary={`Qty: ${item.quantity}`} />
                <Typography variant="body2" fontWeight="medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </ListItem>
              {index < MOCK_CART_ITEMS.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
        <Divider sx={{ mt: 1, mb: 1.5 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Order Total
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold" color="primary.main">
            ${cartTotal.toFixed(2)}
          </Typography>
        </Box>
      </Paper>
    </>
  );
};

StepAddressItems.displayName = 'StepAddressItems';

export default StepAddressItems;
