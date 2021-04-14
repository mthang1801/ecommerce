import React, {useEffect} from 'react'
import portfoliosMenu from "../static/portfolios-menu.json"
import {fetchPortfoliosMenu} from "../static/portfoliosMenu/fetchPortfoliosMenu"
const useStaticData = () => {
  useEffect(() => {    
    if(!portfoliosMenu.lastUpdate || portfoliosMenu.lastUpdate && new Date().getHours() - new Date(portfoliosMenu.lastUpdate).getHours() > 2){
      fetchPortfoliosMenu();
    }
  },[portfoliosMenu])
}

export default useStaticData
