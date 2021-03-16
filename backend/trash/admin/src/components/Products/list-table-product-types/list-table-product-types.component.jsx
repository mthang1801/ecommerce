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
} from "../../../../../../admin/src/components/UI/custom-table/custom-table.styles";
import { FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { connect } from "react-redux";
import {fetchProducts, findProductById, removeProduct} from "../../../redux/products/products.actions"
import EditForm from "../edit-form/edit-form.component";
import {selectProductsCount, selectProductsList} from "../../../redux/products/products.selectors"
import {createStructuredSelector} from "reselect";
import Spinner from "../../../../../../admin/src/components/UI/spinner/spinner.component";
const ListTableCategory = ({ data ,count, fetchProducts, removeProduct }) => {   
  let numPerPage =  +sessionStorage.getItem("numProductsPerPage") || 5 ;
  let page = +sessionStorage.getItem("productPage") || 1 ;   
  const selectNumPerPage = [5,10,20,50];

  const [collapsed, setCollapsed] = useState([]);
  const [colNum, setColNum] = useState(0);
  const [edit, setEdit] = useState({});
  const [cols, setCols] = useState(["name", "linkUrl", "createdAt"]);
  const [loading, setLoading] = useState(false);
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
    sessionStorage.setItem("numProductsPerPage", e.target.value);
    fetchProducts(page, e.target.value);
  }

  
  const handleEditProductType = (id) => { 
    setLoading(true)  ;
    findProductById(id).then(data => {
      setLoading(false);
      setEdit(data);    
    })
    .catch(err => console.log(err));
   
  }
  const handleRemoveProductType = id => {  
    removeProduct(id).then(res => {   
      console.log(count)    
      if(page > 1 && (page-1) * numPerPage === count - 1 ){
        
        page -=1 ;
        sessionStorage.setItem("productPage", page );
        fetchProducts(page, numPerPage)
      }
    })
  }

  const handleClickNextPage = e => {
    if(count > page * numPerPage ){         
      sessionStorage.setItem("productPage", page+1);
      fetchProducts(page+1,numPerPage);
    }
    return ; 
  }
  const handleClickPrevPage = e => {
    if(page > 1) {
      sessionStorage.setItem("productPage" , page-1) ;
      fetchProducts(page-1,numPerPage);
    }
  }

  if (data.length) {
    return (
      <React.Fragment>
        {loading && <Spinner/>}      
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
            {data.map((product) => (
              <Row key={product._id} number={colNum}>
                {cols.map((col, idx) => (
                  <Data key={`${col}-${idx}`} close={close(idx)} tbody title={product[col]}>
                    {col === "imageUrl" ? (
                      <a
                        href={`http://localhost:5000/images/${product[col]}`}
                        style={{ color: "blue" }}
                        target="_blank"
                      >
                        {product[col]}
                      </a>
                    ) : (
                      product[col]
                    )}
                  </Data>
                ))}
                <Data
                  close={close(cols.length)}
                  tbody
                  style={{ textAlign: "center" }}
                >
                  <Button color="#fbc531" onClick={() => handleEditProductType(product._id)}>
                    <FaEdit />
                  </Button>
                  <Button
                    onClick={() => handleRemoveProductType(product._id)}
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
  count : selectProductsCount,
  data : selectProductsList 
})
const mapDispatchToProps = (dispatch) => ({
  fetchProducts : (page,number) => dispatch(fetchProducts(page,number)),
  removeProduct : id => dispatch(removeProduct(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(ListTableCategory);
