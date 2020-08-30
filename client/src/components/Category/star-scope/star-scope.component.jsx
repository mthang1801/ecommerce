import React , {useState} from 'react'
import Star from "../star/star.component";
import {StarScopeWrapper, Title} from "./star-scope.styles";
const StarScope = ({mobileView, tabletView}) => {
  const scope = [5,4.5,4,3.5,3];
  const [selectedValue, setSelectedValue] = useState(null);
  return (
    <StarScopeWrapper>
      <Title>SP theo đánh giá</Title>
      {scope.map(value => (
        <Star value={value} onClick={(value) =>setSelectedValue(value) }/>
      ))}
    </StarScopeWrapper>
  )
}

export default StarScope
