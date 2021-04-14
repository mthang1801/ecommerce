import React, { useState, useCallback, useRef, useEffect } from "react";
import { Wrapper, CategoriesBoard } from "./styles/PortfolioMenuBoard.styles";
import PortfolioMenuItem from "./PortfolioMenuItem";
import PortfolioCategories from "./PortfolioCategories";
import PORTFOLIOS_MENU from "../../static/portfolios-menu.json"

const portfoliosMenu = JSON.parse(JSON.stringify(PORTFOLIOS_MENU));

const PortfolioMenuBoard = ({ open }) => {
  const [activeId, setActiveId] = useState(-1);
  const portfolioRef = useRef(null);
  
  return (
    <Wrapper open={open} ref={portfolioRef}>
      {portfoliosMenu.data && portfoliosMenu.data.map((portfolio,idx) => (
        <PortfolioMenuItem
          key={`portfolio-${portfolio._id}`}
          portfolio={portfolio}
          active={activeId===idx}    
          onMouseOver={() => setActiveId(idx)}    
        />
      ))}
  
      {activeId !== -1 && (
        <CategoriesBoard height={portfolioRef.current.offsetHeight}>
          <PortfolioCategories data={portfoliosMenu.data[activeId]} />
        </CategoriesBoard>
      )}
    </Wrapper>
  );
};

export default PortfolioMenuBoard;
