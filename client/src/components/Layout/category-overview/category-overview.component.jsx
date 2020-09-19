import React, { useState, useEffect, useContext } from "react";
import { CategoryOverViewContainer } from "./category-overview.styles";
import CategoryToggle from "../category-toggle/category-toggle.component";
import { withRouter } from "react-router-dom";
import Backdrop from "../../UI/backdrop/backdrop.component"
import AppContext from "../../../context/app-viewport.context";
const CategoryOverView = ({ match }) => {
  const [toggle, setToggle] = useState(false);
  const [hardToggle, setHardToogle] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [smallView, setSmallView] = useState(window.innerWidth < 992);
  const width = useContext(AppContext);
  useEffect(() => {
    if (width < 992) {
      setSmallView(true);
    } else {
      setSmallView(false);
    }
  }, [width]);
  useEffect(() => {
    if (match.path === "/" && match.isExact) {
      setToggle(smallView ? false : true);
      setHardToogle(smallView ? false : true);
    } else {
      setHardToogle(false);
    }
  }, [smallView, match.path, match.isExact]);
  const handleToggleCategory = e => {        
    setToggle(prevState => !prevState);
    setShowBackdrop(prevState => !prevState)
  }
  return (
    <CategoryOverViewContainer>
      <Backdrop show={showBackdrop} onClick={handleToggleCategory}/>     
      {hardToggle ? (
        <CategoryToggle show={true} smallView={smallView} onClick={handleToggleCategory}  onMouseEnter={() => setShowBackdrop(true)}  onMouseLeave={() => setShowBackdrop(false)} />
      ) : (
        <React.Fragment>             
          <CategoryToggle            
            show={toggle}   
            smallView={smallView}         
            onClick={handleToggleCategory}
            onMouseEnter={() => { setToggle(true) ; setShowBackdrop(true) }}
            onMouseLeave={() => { setToggle(false) ; setShowBackdrop(false) }}
          />
        </React.Fragment>
      )}
    </CategoryOverViewContainer>
  );
};

export default withRouter(CategoryOverView);
