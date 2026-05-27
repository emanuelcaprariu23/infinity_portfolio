import { Box, Button, TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import { useAuthStoreLocalStorage } from '../store/authStore';

const common = {
  type: 'text',
  sx: { width: '50px', height: '50px' },
  inputProps: { style: { fontSize: 20, textAlign: 'center', padding: '15px' } },
} as TextFieldProps;

const CheckCode: React.FC = () => {
  const { updateValidationCode } = useAuthStoreLocalStorage();

  const validateCodeHandler = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const valuesArray = Array.from(Array(6)).map((_, index) => formData.get(`${index}-code`));

    console.log({ valuesArray });
    updateValidationCode(valuesArray.join(''));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <form onSubmit={validateCodeHandler}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
          {Array.from(Array(6)).map((_, index) => {
            const key = `${index}-code`;

            return <TextField {...common} key={key} name={key} />;
          })}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            margin: '10px 0',
          }}
        >
          <Button variant="contained" type="submit">
            Validate
          </Button>
        </Box>
      </form>
    </Box>
  );
};

CheckCode.displayName = 'CheckCode';

export default CheckCode;
