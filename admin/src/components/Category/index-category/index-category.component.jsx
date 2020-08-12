import React, {useState} from 'react'
import {IndexCategoryWrapper} from "./index-category.styles";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectCategoryList} from "../../../redux/category/category.selector";
import SearchForm from "../search-form/search-form.component";
import ListTableCategory from "../list-table-category/list-table-category.component";
import EditForm from "../edit-form/edit-form.component";
const IndexCategory = ({categoryList}) => {
  const [edit, setEdit] = useState({}); 
  return (
    <IndexCategoryWrapper>
      {/* <EditForm edit={edit} setEdit={setEdit}/> */}
      <SearchForm/>
      <ListTableCategory data={categoryList} setEdit={val => setEdit(val)}/>
    </IndexCategoryWrapper>
  )
}

const mapStateToProps = createStructuredSelector({
  categoryList : selectCategoryList
})

export default connect(mapStateToProps)(IndexCategory);
