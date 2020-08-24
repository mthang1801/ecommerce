import React, { useState, useEffect } from "react";
import { CategoryOverViewContainer } from "./category-overview.styles";
import CategoryToggle from "../category-toggle/category-toggle.component";
import CategoryMenu from "../category-menu/category-menu.component";
import { withRouter } from "react-router-dom";
const CategoryOverView = ({ match }) => {
  const [toggle, setToggle] = useState(false);
  const [hardToggle, setHardToogle] = useState(false);
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
      {hardToggle ? (
        <CategoryToggle show={true} />
      ) : (
        <React.Fragment>        
          <CategoryToggle
            show={toggle}
            onMouseEnter={() => setToggle(true)}
            onMouseLeave={() => setToggle(false)}
          />
        </React.Fragment>
      )}
    </CategoryOverViewContainer>
  );
};

export default withRouter(CategoryOverView);
