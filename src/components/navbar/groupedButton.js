import React from "react";
import { Button,ButtonGroup } from "@mui/material";

function GroupedButtons({qty,handleChange}) {
 const [counter, setCounter ] = React.useState(qty)
 const handleIncrement = () => {
    handleChange(1);
  //  this.setState(state => ({ counter: state.counter + 1 }));
  };

  const handleDecrement = () => {
    handleChange(-1);
  };
  React.useEffect(()=>{
   setCounter(qty)
  },[qty])  
  
  const displayCounter = counter > 0;


    return (
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button onClick={handleIncrement}>+</Button>
        {displayCounter && <Button disabled>{counter}</Button>}
        {displayCounter && <Button onClick={handleDecrement}>-</Button>}
      </ButtonGroup>
    );
  }


export default GroupedButtons;
