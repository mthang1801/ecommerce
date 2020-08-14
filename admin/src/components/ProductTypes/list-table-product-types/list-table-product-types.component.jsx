import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Row,
  Data,
  Button,
  BtnText,
  TFooter,
  Select, 
  Option
} from "../../UI/custom-table/custom-table.styles";
import { FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { connect } from "react-redux";
import {fetchProductTypes, findProductTypesById , removeProductType} from "../../../redux/product-types/product-types.actions"
import EditForm from "../edit-form/edit-form.component";
import {selectProductTypesCount} from "../../../redux/product-types/product-types.selectors"
import {createStructuredSelector} from "reselect";
const ListTableCategory = ({ data,count, fetchProductTypes, removeProductType }) => {   
  const numPerPage =  +sessionStorage.getItem("numPerPage") || 5 ;
  let page = +sessionStorage.getItem("page") || 1 ;   
  const selectNumPerPage = [5,10,20,50];

  const [collapsed, setCollapsed] = useState([]);
  const [colNum, setColNum] = useState(0);
  const [edit, setEdit] = useState({});
  const [cols, setCols] = useState(["_id", "name", "linkUrl", "createdAt"]);

  const close = (position) => {
    if (collapsed.includes(position)) {
      return true;
    }
    return false;
  };
  
  const handleToggle = (pos) => {
    let findIdx = collapsed.findIndex((idx) => idx === pos);
    if (findIdx > -1) {
      setCollapsed((prevState) => prevState.filter((idx) => idx !== pos));
      setColNum((prevState) => prevState + 1);
    } else {
      setCollapsed((prevState) => [...prevState, pos]);
      setColNum((prevState) => prevState - 1);
    }
  };

  const handleSelectNumPerPageChange = e => {    
    sessionStorage.setItem("numPerPage", e.target.value);
    fetchProductTypes(page, e.target.value);
  }

  const handleEditProductType = (id) => {
    findProductTypesById(id).then(data => {
      setEdit({_id: data._id, name : data.name, linkUrl : data.linkUrl, rootLink : data.category.linkUrl})
    }).catch(err => console.log(err));
  }
  console.log(count)
  const handleRemoveProductType = id => {  
    removeProductType(id).then(res => {                 
      console.log(page * numPerPage, count)
      if(page > 1 && (page-1) * numPerPage === count - 1 ){
        page -=1 ;
        sessionStorage.setItem("page", page );
        fetchProductTypes(page, numPerPage)
      }
    })
  }

  const handleClickNextPage = e => {
    if(count > page * numPerPage ){         
      sessionStorage.setItem("page", page+1);
      fetchProductTypes(page+1,numPerPage);
    }
    return ; 
  }
  const handleClickPrevPage = e => {
    if(page > 1) {
      sessionStorage.setItem("page" , page-1) ;
      fetchProductTypes(page-1,numPerPage);
    }
  }

  if (data.length) {
    return (
      <React.Fragment>
        <Table>
          <Thead>
            <Row number={colNum}>
              {cols.map((col, idx) => (
                <Data key={col} close={close(idx)}>
                  <span>{col}</span>
                  {close(idx) ? (
                    <BtnText onClick={() => handleToggle(idx)}>&#10095;</BtnText>
                  ) : (
                    <BtnText onClick={() => handleToggle(idx)}>&#10094;</BtnText>
                  )}
                </Data>
              ))}
              <Data>{close(cols.length) ? (
                    <BtnText onClick={() => handleToggle(cols.length)}>&#10095;</BtnText>
                  ) : (
                    <BtnText onClick={() => handleToggle(cols.length)}>&#10094;</BtnText>
                  )}</Data>
            </Row>
          </Thead>
          <Tbody>
            {data.map((category) => (
              <Row key={category._id} number={colNum}>
                {cols.map((col, idx) => (
                  <Data key={`${col}-${idx}`} close={close(idx)} tbody title={category[col]}>
                    {col === "imageUrl" ? (
                      <a
                        href={`http://localhost:5000/images/${category[col]}`}
                        style={{ color: "blue" }}
                        target="_blank"
                      >
                        {category[col]}
                      </a>
                    ) : (
                      category[col]
                    )}
                  </Data>
                ))}
                <Data
                  close={close(cols.length)}
                  tbody
                  style={{ textAlign: "center" }}
                >
                  <Button color="#fbc531" onClick={() => handleEditProductType(category._id)}>
                    <FaEdit />
                  </Button>
                  <Button
                    onClick={() => handleRemoveProductType(category._id)}
                    color="#dd2222"
                  >
                    <FaTrash />
                  </Button>
                </Data>
              </Row>
            ))}
          </Tbody>          
          <TFooter>
            <BtnText onClick={handleClickPrevPage} disabled={ page == 1} >&#10094;</BtnText>
            <span>{page}</span>
            <BtnText onClick={handleClickNextPage} disabled={count <= ( page * numPerPage )}>&#10095;</BtnText>
            <Select value={numPerPage} onChange={handleSelectNumPerPageChange}>
              {selectNumPerPage.map( item => (
                <Option key={item} value={item}>{item}</Option>
              ))}
            </Select>
          </TFooter>
        </Table>
        <EditForm edit={edit} setEdit={setEdit} />
      </React.Fragment>
    );
  }
  return null;
};

const mapStateToProps = createStructuredSelector({
  count : selectProductTypesCount
})
const mapDispatchToProps = (dispatch) => ({
  fetchProductTypes : (page,number) => dispatch(fetchProductTypes(page,number)),
  removeProductType: (id) => dispatch(removeProductType(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(ListTableCategory);
