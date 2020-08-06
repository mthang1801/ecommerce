import React, {useState} from 'react'
import {TaskBarContainer,Grid, Paragraph, Strong, Select,Option, Settings, Button} from "./taskbar.styles";
import {getNumberOfProducts} from "../../../utils/algorithms";
import {BsGridFill} from "react-icons/bs"
import {FaListUl } from "react-icons/fa"

const TaskBar = () => {
  const numberOfProducts = getNumberOfProducts();
  const [sortBy, setSortBy] = useState("ascending");
  const [view,setView] = useState("grid");
  return (
    <TaskBarContainer>
      <Grid>
        <Paragraph>Sắp xếp</Paragraph>
        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <Option value="ascending">Tăng dần</Option>
          <Option value="descending">Giảm dần</Option>
        </Select>
      </Grid>
      <Grid>
        <Paragraph>Tìm thấy <Strong>{numberOfProducts} </Strong>mặt hàng</Paragraph>
      </Grid>
      <Grid>
        <Settings>
          <Button active={view==="grid"} onClick={() => setView("grid")}><BsGridFill/></Button>
          <Button active={view==="list"} onClick={() => setView("list")}><FaListUl/></Button>
        </Settings>
      </Grid>
    </TaskBarContainer>
  )
}

export default TaskBar
