import React from 'react'
import {Wrapper, Controls} from "./styles/CardRequestLoginSignup.styles"
import {Link, useLocation} from "react-router-dom"
import useLanguage from "../Global/useLanguage"

const CardRequestLoginSignup = () => {
  const {i18n, lang} = useLanguage();
  const {authenticate} = i18n.store.data[lang].translation
  const {pathname} = useLocation()  
  return (
    <Wrapper>
      <h4>{authenticate.requestAuth}</h4>
      <Controls>
        <Link to={{pathname : "/auth" , state : {from : pathname}}}>{authenticate.login}</Link>
        <Link to={{pathname : "/auth/signup" , state : {from : pathname}}}>{authenticate.signup}</Link>

      </Controls>
    </Wrapper>
  )
}

export default CardRequestLoginSignup
