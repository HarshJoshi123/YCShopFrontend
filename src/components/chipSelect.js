import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectLabels({options,id}) {
  const [val, setVal] = React.useState('');

  const handleChange = (event) => {
    setVal(event.target.value);
  };

  return (
    <div>
      <FormControl fullWidth sx={{minWidth: 150,my:1 }}>
        <InputLabel id={id}>{id}</InputLabel>
        <Select
          labelId={id}
          name={id}
          id={id}
          style={{width:'100%'}}
          value={val}
          label={id}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
       {options.map((v)=>(
          <MenuItem value={v}>{v}</MenuItem>
       ))}
         </Select>
        {/* <FormHelperText>Select </FormHelperText> */}
      </FormControl>
      </div>
  );
}
