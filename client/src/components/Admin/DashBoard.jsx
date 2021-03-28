import React , {useState} from 'react'
import {Wrapper, CustomLink, DropdownWrapper, ButtonDropdown, Dropdown} from "./styles/DashBoard.styles"
import {withRouter} from "react-router-dom"
import useLanguage from "../Global/useLanguage"
import {FaChevronDown, FaChevronUp} from "react-icons/fa"
const DashBoard = ({match}) => {  
  const {i18n, lang} = useLanguage();
  const {adminNavigations : {home, productManagers}} = i18n.store.data[lang].translation  
  const [showProductsManager, setShowProductsManager] = useState(true);
  
  return (
    <Wrapper>
      <CustomLink active={match.path === home.path} to={`${home.path}`}>
        <span>{home.icon}</span>
        <span>{home.name}</span>
      </CustomLink>
      <DropdownWrapper>
        <ButtonDropdown onClick={() => setShowProductsManager(prevState => !prevState)}>
          <span>{productManagers.icon}</span>
          <span>{productManagers.name}</span>
          <span>{showProductsManager ? <FaChevronUp/> :  <FaChevronDown/> }</span>
        </ButtonDropdown>
        <Dropdown show={showProductsManager}>
          {productManagers.children.map(item => (
            <CustomLink active={match.path === item.path} to={`${item.path}`} key={item.name}>
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </CustomLink>
          ))}
        </Dropdown>
      </DropdownWrapper>
    </Wrapper>
  )
}

export default withRouter(DashBoard)
