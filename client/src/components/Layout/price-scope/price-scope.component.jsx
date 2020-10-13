import React, {useLayoutEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import {PriceLabel} from "./price-scope.styles";
import Button from "@material-ui/core/Button"
const useStyles = makeStyles({
  root: {
    width: "95%",    
    display : "flex", 
    flexDirection : "column",
    margin : "1rem auto 1rem auto"    
  },
});

function valuetext(value) {
  return `${value} VND`;
}

const PriceScope = ({maxPrice, setMaxPriceChange, setMinPriceChange, setFilter}) => {
  const classes = useStyles();
  const urlParams = new URLSearchParams(window.location.search);  
  const [value, setValue] = React.useState([0, maxPrice]);
  useLayoutEffect(() => {
    setValue([+urlParams.get("min_price"), +urlParams.get("max_price") === 0 ? maxPrice : +urlParams.get("max_price")])
  }, [window.location.search, new URLSearchParams(window.location.search).get("max_price") ,  new URLSearchParams(window.location.search).get("min_price")])
  const handleChange = (e, newValue) => {
    setValue(newValue);
  }

  const handleFilter = e => {
    setMinPriceChange(value[0]);
    setMaxPriceChange(value[1]);
    setFilter()
  }
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
      <Button color="primary" variant="contained" size="small" onClick={handleFilter}>Lọc</Button>
    </div>
  );
};

export default PriceScope;
