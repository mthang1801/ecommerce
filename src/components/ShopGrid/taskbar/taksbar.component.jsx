import React, {useState} from 'react'
import {TaskBarContainer,Grid, Paragraph, Strong, Select,Option, Settings, Button} from "./taskbar.styles";
import {getNumberOfProducts} from "../../../utils/algorithms";
import {BsGridFill} from "react-icons/bs"
import {FaListUl } from "react-icons/fa"

const TaskBar = ({mobileView,tabletView}) => {
  const numberOfProducts = getNumberOfProducts();
  const [sortBy, setSortBy] = useState("ascending");
  const [view,setView] = useState("grid");
  return (
    <TaskBarContainer mobileView={mobileView} tabletView={tabletView}>
      <Grid mobileView={mobileView} tabletView={tabletView}>
        <Paragraph>Sắp xếp</Paragraph>
        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <Option value="ascending">Tăng dần</Option>
          <Option value="descending">Giảm dần</Option>
        </Select>
      </Grid>
      <Grid mobileView={mobileView} tabletView={tabletView} hideSm>
        <Paragraph>Tìm thấy <Strong>{numberOfProducts} </Strong>mặt hàng</Paragraph>
      </Grid>
      <Grid mobileView={mobileView} tabletView={tabletView} hideMd>
        <Settings>
          <Button active={view==="grid"} onClick={() => setView("grid")}><BsGridFill/></Button>
          <Button active={view==="list"} onClick={() => setView("list")}><FaListUl/></Button>
        </Settings>
      </Grid>
    </TaskBarContainer>
  )
}

export default TaskBar
