import React, { useState, useEffect } from "react";
import { CategoryOverViewContainer } from "./category-overview.styles";
import CategoryToggle from "../category-toggle/category-toggle.component";
import { withRouter } from "react-router-dom";
import Backdrop from "../../UI/backdrop/backdrop.component"
const CategoryOverView = ({ match }) => {
  const [toggle, setToggle] = useState(false);
  const [hardToggle, setHardToogle] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);
  useEffect(() => {
    if (match.path === "/" && match.isExact) {
      setToggle(true);
      setHardToogle(true);
    } else {
      setHardToogle(false);
    }
  }, [match.path, match.isExact]);
  return (
    <CategoryOverViewContainer>
      <Backdrop show={showBackdrop} />     
      {hardToggle ? (
        <CategoryToggle show={true}   onMouseEnter={() => setShowBackdrop(true)}  onMouseLeave={() => setShowBackdrop(false)} />
      ) : (
        <React.Fragment>             
          <CategoryToggle            
            show={toggle}
            onMouseEnter={() => { setToggle(true) ; setShowBackdrop(true) }}
            onMouseLeave={() => { setToggle(false) ; setShowBackdrop(false) }}
          />
        </React.Fragment>
      )}
    </CategoryOverViewContainer>
  );
};

export default withRouter(CategoryOverView);
