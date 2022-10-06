import * as React from 'react';
import PropTypes from 'prop-types';
import {NumberFormatBase} from 'react-number-format';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormatBase
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function NumberField() {
  const [values, setValues] = React.useState({
    numberformat: '1320',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Box
      sx={{
        '& > :not(style)': {
          m: 1,
        },
      }}
    >
      <TextField
        label="react-number-format"
        value={values.numberformat}
        onChange={handleChange}
        name="numberformat"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
        variant="standard"
      />
    </Box>
  );
}
