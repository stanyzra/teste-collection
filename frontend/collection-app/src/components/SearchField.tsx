import { styled, TextField } from '@mui/material';

const SearchField = styled(TextField)({ // TextField personalizado
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#C3BFC3',
      // borderColor: 'none',
    },
    '&:hover fieldset': {
      borderColor: 'black',
      // borderColor: '#000000',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#2f2d30',
      // borderColor: '#580899',
    },
    // backgroundColor: '#ffffff',
    // borderRadius: '25px',
    WebkitTextFillColor: '#141414',
  },
});

export default SearchField;
