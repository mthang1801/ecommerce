import React, {useState, useEffect, useRef, memo} from 'react'
import {Form,FormGroup, Input, Title, Label, Error, BtnSubmit, Select, Option, Feedback} from "../../../../../../admin/src/components/UI/custom-form/custom-form.styles";
import {EditFormWrapper, FormWrapper,} from "./edit-form.styles"
import Backdrop from "../../../../../../admin/src/components/UI/backdrop/backdrop.component";
import {createStructuredSelector} from "reselect";
import {selectCategoryList} from "../../../../../../admin/src/redux/category/category.selector";
import {editProduct} from "../../../redux/products/products.actions"
import {connect} from "react-redux";
import Spinner from "../../../../../../admin/src/components/UI/spinner/spinner.component";
import axios from "axios"
const EditForm = ({edit, setEdit, categoryList, editProduct}) => {    
  const [name, setName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [categoryLink, setCategoryLink] = useState(""); 
  const [rootLink, setRootLink] = useState("");
  const [loading, setLoading ] = useState(false);
  const [curCategory, setCurCategory] = useState({});
  const [curProductType, setCurProductType] = useState({})
  const [productTypes, setProductTypes] = useState([]);
  const [error, setError] = useState(null);
  const formRef = useRef(null);
 
  useEffect(() => {    
    setName(edit.name);
    if(edit.linkUrl){      
      setLinkUrl("/" + edit.linkUrl.split("/")[3]);
    }    
    setCategoryLink(edit.categoryLink);
    setRootLink(edit.rootLink);
    setCurCategory(edit.curCategory);
    setCurProductType(edit.curProductType);
  }, [edit, categoryList]);

  const handleSelectChange = (e) => {
    e.preventDefault();
    const categoryId = e.target.value ; 
    setCategoryLink(categoryId);   
    setLoading(true);
    axios.get("/list-links-product-types", {params : {id : categoryId}})
    .then(res => {
      setProductTypes(res.data);
      if(res.data.length){
        setRootLink(res.data[0].linkUrl)
      }
      setLoading(false);
    })
    .catch(err => console.log(err));
  };

  const handleChangeProductType = (e) => {
    let val = e.target.value ; 
    if(val[0] !== "/"){
      val = "/" + val.toLowerCase() ;
    }
    setLinkUrl(val.replace(/[^a-zA-Z0-9/-]/g, ""))
  }
  
  const handleChangeProductTypes = (e) => {
    setRootLink(e.target.value);
  }
  const handleSubmitForm = e => {
    e.preventDefault(); 
    setError(null);    
    if(!name || name.length < 3 || !linkUrl || !rootLink || !categoryLink){      
      setError("You must fill all fields and name at least 3 characters");
      return ;
    }    
    const  data = {
      _id : edit._id , 
      name, 
      linkUrl : rootLink + linkUrl,
      rootLink : rootLink,
      categoryLink : "/" + rootLink.split("/")[1]
    }   
    editProduct(data).then(res => {
      setEdit({});
      setLoading(false);
    }).catch(err => {
      setError(err);    
      setLoading(false)  ;
    })
    
  }
  const showForm = Object.keys(edit).length >0;
  return (
    <EditFormWrapper >       
      {loading && <Spinner/>}
      <Backdrop show={showForm || loading} loading={loading} close={() => setEdit({})}/>
      <FormWrapper show={showForm}>
      <Form ref={formRef} onSubmit={handleSubmitForm}>
        <Title>Thêm SP</Title>
        {error && <Error>{error}</Error>}        
        <FormGroup>
          <Label>Tên SP</Label>
          <Input
            type="text"
            name="name"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Lựa chọn nhóm SP</Label>
          <Select defaultValue={""} onChange={handleSelectChange}>     
          <Option value={""}>{"-- Lựa chọn nhóm SP-- "}</Option>       
            {categoryList.map((categoryItem) => (
              <Option key={categoryItem._id} value={categoryItem._id}>
                {categoryItem.name}
              </Option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Lựa chọn loại SP</Label>
          <Select defaultValue={""} onChange={handleChangeProductTypes}>          
          <Option value={""} disabled>{"-- Lựa chọn loại SP-- "}</Option>    
            {productTypes.map((link) => (
              <Option key={link.name} value={link.linkUrl}>
                {link.name}
              </Option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
            <Label>Đường dẫn gốc</Label>
            <Input value={rootLink || ""} disabled/>
          </FormGroup>
          <FormGroup>
            <Label>Tạo đường dẫn liên kết</Label>
            <Input
              type="text"
              name="linkUrl"
              value={linkUrl}
              onChange={handleChangeProductType}
            />
            <Feedback>Không khoảnh trắng và ký tự đặc biệt</Feedback>
          </FormGroup>       
          <FormGroup>
            <Label>Đường dẫn đầy đủ</Label>
            <Input
              type="text"
              name="linkUrl"
              value={rootLink + linkUrl}
              readOnly
            />
            <Feedback>Không khoảnh trắng và ký tự đặc biệt</Feedback>
          </FormGroup>       
       
        <FormGroup>
          <BtnSubmit>Thêm SP</BtnSubmit>
        </FormGroup>
      </Form>          
      </FormWrapper>    
    </EditFormWrapper>
  )
}

const mapDispatchToProps = dispatch => ({
  editProduct : product => dispatch(editProduct(product))
})
const mapStateToProps = createStructuredSelector({
  categoryList : selectCategoryList
})
export default memo(connect(mapStateToProps, mapDispatchToProps)(EditForm)) 
