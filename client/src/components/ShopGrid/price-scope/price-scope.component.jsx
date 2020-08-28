import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { getMaxPrice } from "../../../utils/connectDB";
import {PriceLabel} from "./price-scope.styles";
const useStyles = makeStyles({
  root: {
    width: 300,
    maxWidth : "90%",
    display : "flex", 
    flexDirection : "column",
    margin : "2rem 0 4rem 0"    
  },
});

function valuetext(value) {
  return `${value} VND`;
}

const PriceScope = () => {
  const maxPrice = getMaxPrice();
  const classes = useStyles();
  const [value, setValue] = React.useState([0, maxPrice]);

  const handleChange = (e, newValue) => {
    setValue((newValue));
  };
  return (
    <div className={classes.root}>
      <PriceLabel>Giá</PriceLabel>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        min={0}
        max={maxPrice}
      />
      <div>{value[0].toLocaleString("es-AR")}-{value[1].toLocaleString("es-AR")}</div>
    </div>
  );
};

export default PriceScope;
