import React, {useState, useEffect, useRef} from 'react'
import {Input, FormGroup, Form, Label,BtnSubmit, FormInline, BtnInline } from "../../UI/custom-form/custom-form.styles";
import {connect} from "react-redux";
import {searchProductTypes} from "../../../redux/product-types/product-types.actions"
import {FaSearch} from "react-icons/fa"
const SearchForm = ({searchProductTypes}) => {
  const [searchKey, setSearchKey] = useState("");   
  const searchRef = useRef(null);
  useEffect(() => {
    searchRef.current.focus();
  }, [])
  const handleSubmitForm = e => {
    e.preventDefault();
    searchProductTypes(searchKey);
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
  searchProductTypes : (searchKey) => dispatch(searchProductTypes(searchKey))
})

export default connect(null, mapDispatchToProps)(SearchForm);
