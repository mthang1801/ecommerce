import React, {useState} from 'react'
import {TaskBarContainer,Grid, Paragraph, Strong} from "./taskbar.styles";
import {getNumberOfProducts} from "../../../utils/connectDB";
const TaskBar = ({mobileView,tabletView, numProducts}) => {
  const numberOfProducts = getNumberOfProducts();
  const [sortBy, setSortBy] = useState("ascending");
  const [view,setView] = useState("grid");
  return (
    <TaskBarContainer mobileView={mobileView} tabletView={tabletView}>     
      <Grid mobileView={mobileView} tabletView={tabletView} >
        <Paragraph>Tìm thấy <Strong>{numProducts} </Strong>mặt hàng</Paragraph>
      </Grid>     
    </TaskBarContainer>
  )
}

export default TaskBar
