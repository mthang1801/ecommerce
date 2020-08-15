import React, {useState, useEffect, useRef, memo} from 'react'
import {Form,FormGroup, Input, Title, Label, Error, BtnSubmit, Select, Option, Feedback} from "../../UI/custom-form/custom-form.styles";
import {EditFormWrapper, FormWrapper,} from "./edit-form.styles"
import Backdrop from "../../UI/backdrop/backdrop.component";
import {createStructuredSelector} from "reselect";
import {selectCategoryList} from "../../../redux/category/category.selector";
import {editProductTypes} from "../../../redux/product-types/product-types.actions"
import {connect} from "react-redux";
const EditForm = ({edit, setEdit, categoryList, editProductTypes}) => {    
  const [name, setName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [rootLinkUrl, setRootLinkUrl] = useState(""); 
  const [error, setError] = useState(null);
  const formRef = useRef(null);
  useEffect(() => {
    setName(edit.name);
    if(edit.linkUrl){
      setLinkUrl("/" + edit.linkUrl.split("/")[2]); 
    }    
    setRootLinkUrl(edit.rootLink)
  }, [edit, categoryList])
  const handleSelectChange = (e) => {
    setRootLinkUrl(e.target.value);
  };
  const handleChangeProductType = (e) => {
    let val = e.target.value ; 
    if(val[0] !== "/"){
      val = "/" + val.toLowerCase() ;
    }
    setLinkUrl(val.replace(/[^a-zA-Z0-9/-]/g, ""))
  }
  const handleSubmitForm = e => {
    e.preventDefault(); 
    setError(null);    
    if(!name || name.length < 3 || !linkUrl || rootLinkUrl==="#" ){      
      setError("You must fill all fields and name at least 3 characters");
      return ;
    }    
    const  data = {
      _id : edit._id , 
      name, 
      linkUrl : rootLinkUrl + linkUrl,
      rootUrl : rootLinkUrl
    }   
    
    editProductTypes(data).then(res => {
      setEdit({});
    })
    .catch(err => {
      setError(err.message);
    })
  }
  const showForm = Object.keys(edit).length >0;

  return (
    <EditFormWrapper >
      <Backdrop show={showForm} close={() => setEdit({})}/>
      <FormWrapper show={showForm}>
      <Form ref={formRef} onSubmit={handleSubmitForm}>
        <Title>Thêm Loại SP</Title>
        {error && <Error>{error}</Error>}        
        <FormGroup>
          <Label>Tên Loại SP</Label>
          <Input
            type="text"
            name="name"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Lựa chọn nhóm SP</Label>
          <Select defaultValue="#" onChange={handleSelectChange}>  
          <Option value="#" disabled>--Lựa chọn nhóm SP--</Option>        
            {categoryList.map((categoryItem) => (
              <Option key={categoryItem._id} value={categoryItem.linkUrl} >
                {categoryItem.name}
              </Option >
            ))}
          </Select>
        </FormGroup>
          <FormGroup>
            <Label>Đường dẫn gốc</Label>
            <Input value={rootLinkUrl||""} disabled/>
          </FormGroup>
          <FormGroup>
            <Label>Tạo đường dẫn liên kết</Label>
            <Input
              type="text"
              name="linkUrl"
              value={linkUrl || ""}
              onChange={handleChangeProductType}
            />
            <Feedback>Không khoảnh trắng và ký tự đặc biệt</Feedback>
          </FormGroup>       
          <FormGroup>
            <Label>Đường dẫn đầy đủ</Label>
            <Input
              type="text"
              name="linkUrl"
              value={rootLinkUrl + linkUrl || ""}
              disabled
            />          
          </FormGroup>       
       
        <FormGroup>
          <BtnSubmit>Lưu SP</BtnSubmit>
        </FormGroup>
      </Form>                 
      </FormWrapper>    
    </EditFormWrapper>
  )
}

const mapDispatchToProps = dispatch => ({
  editProductTypes : productType => dispatch(editProductTypes(productType))
})
const mapStateToProps = createStructuredSelector({
  categoryList : selectCategoryList
})
export default memo(connect(mapStateToProps, mapDispatchToProps)(EditForm)) 
