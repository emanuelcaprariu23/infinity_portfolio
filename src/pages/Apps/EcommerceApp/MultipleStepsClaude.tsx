import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle } from '@mui/icons-material';
import { Box, Button, Paper, Step, StepLabel, Stepper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { FieldPath, useForm } from 'react-hook-form';
import {
  CheckoutFormData,
  checkoutSchema,
  MOCK_CART_ITEMS,
  STEPS,
} from './Pages/Steps/checkoutSchema';
import StepAddressItems from './Pages/Steps/StepAddressItems';
import StepPayment from './Pages/Steps/StepPayment';
import StepUserData from './Pages/Steps/StepUserData';

const STEP_FIELDS: Record<number, FieldPath<CheckoutFormData>[]> = {
  0: ['name', 'gender', 'age', 'email'],
  1: ['street', 'city', 'country', 'zipCode'],
  2: ['cardHolder', 'cardNumber', 'expiryDate', 'cvv'],
};

const defaultValues: CheckoutFormData = {
  name: '',
  gender: 'male',
  age: '',
  email: '',
  street: '',
  city: '',
  country: '',
  zipCode: '',
  cardHolder: '',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
};

const orderTotal = MOCK_CART_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0);

const MultipleStepsClaude: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues,
    mode: 'onTouched',
  });

  const handleNext = async () => {
    const isValid = await trigger(STEP_FIELDS[activeStep]);
    if (isValid) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const onSubmit = (data: CheckoutFormData) => {
    console.log('Order placed:', data);
    setIsCompleted(true);
  };

  const handleReset = () => {
    reset(defaultValues);
    setIsCompleted(false);
    setActiveStep(0);
  };

  if (isCompleted) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 8,
          gap: 2,
          maxWidth: 480,
          mx: 'auto',
        }}
      >
        <CheckCircle sx={{ fontSize: 96, color: 'success.main' }} />
        <Typography variant="h5" fontWeight="bold" align="center">
          Order Placed Successfully!
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center">
          Thank you, <strong>{getValues('name')}</strong>! Your order worth{' '}
          <strong>${orderTotal.toFixed(2)}</strong> is on its way to{' '}
          <strong>{getValues('city')}</strong>.
        </Typography>
        <Button variant="contained" onClick={handleReset} sx={{ mt: 2 }}>
          Place Another Order
        </Button>
      </Box>
    );
  }

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <StepUserData register={register} errors={errors} control={control} />;
      case 1:
        return <StepAddressItems register={register} errors={errors} />;
      case 2:
        return <StepPayment register={register} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 680, mx: 'auto', py: 4, px: 2 }}>
      <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
        Checkout
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {STEPS.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {renderStep()}

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 4,
              pt: 2,
              borderTop: 1,
              borderColor: 'divider',
            }}
          >
            <Button onClick={handleBack} disabled={activeStep === 0} variant="outlined">
              Back
            </Button>

            {activeStep < STEPS.length - 1 ? (
              <Button onClick={handleNext} variant="contained">
                Next Step
              </Button>
            ) : (
              <Button type="submit" variant="contained" color="success" disabled={isSubmitting}>
                Place Order
              </Button>
            )}
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

MultipleStepsClaude.displayName = 'MultipleStepsClaude';

export { MultipleStepsClaude };
