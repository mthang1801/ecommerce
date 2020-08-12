import React, {useState, useEffect, useRef} from 'react'
import {Input, FormGroup, Form, Label,BtnSubmit, FormInline, BtnInline } from "../../UI/custom-form/custom-form.styles";
import {connect} from "react-redux";
import {searchCategory} from "../../../redux/category/category.actions"
import {FaSearch} from "react-icons/fa"
const SearchForm = ({searchCategory}) => {
  const [searchKey, setSearchKey] = useState("");   
  const searchRef = useRef(null);
  useEffect(() => {
    searchRef.current.focus();
  }, [])
  const handleSubmitForm = e => {
    e.preventDefault();
    searchCategory(searchKey);
  }
  return (
    <Form onSubmit={handleSubmitForm}>     
      <FormInline>
        <FormGroup>
          <Label>Tìm kiếm</Label>
          <Input ref={searchRef} type="text" value={searchKey} onChange={(e) => setSearchKey(e.target.value)}/>        
        </FormGroup>   
        <BtnInline><FaSearch/></BtnInline>   
      </FormInline>
    </Form>
  )
}

const mapDispatchToProps = dispatch => ({
  searchCategory : (searchKey) => dispatch(searchCategory(searchKey))
})

export default connect(null, mapDispatchToProps)(SearchForm);
