import React, {useState} from 'react'
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
const Star = ({value, onClick}) => {
  const [color, setColor] = useState("primary");
  const handleMouseOver = e => {
    setColor("#dd2222");
  }
  const handleMouseOut = e => {
    setColor("#ffc83d")
  }
  return (
    <Box component="fieldset" mb={1} borderColor="transparent" justifyContent="center" alignItems="center" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={{cursor : "pointer"}} onClick={() => onClick(value)}>       
      <Rating name="half-rating" defaultValue={value} precision={0.5} style={{verticalAlign : "text-bottom", color}}  readOnly />
      <Typography component="span" style={{fontSize: "0.9em", color : "#606060"}}>({value} sao)</Typography>
    </Box>
  )
}

export default Star
