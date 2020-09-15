import React, {useEffect, useState} from 'react'
import {  
  getProductList, updateLinkUrl
} from "../../../utils/connectDB";
import {JSONData, ProductListWrapper} from "./product-list.styles"
import Button from '@material-ui/core/Button';
const ProductList = ({match}) => {
  console.log(match);
  const [productList, setProductList] = useState(null);
  const [alert, setAlert] = useState(null);
  useEffect(() => {
    let _mounted = true ; 

    getProductList().then(data => {               
      if(_mounted){        
        setProductList(JSON.stringify(data));
      }      
    });
    return () => _mounted = false ;
  }, [getProductList]);

  const handleUpdateLinkUrl = e => {
    updateLinkUrl(productList).then(res => {
      setAlert("Tạo file thành công");
    }).catch(err => {
      setAlert("Tạo file thất bại");
    });
  }
  // const handleClick = () => {
  //   updateManufactor();
  // }
  return (  
    <ProductListWrapper>    
      {alert && <h2>{alert}</h2>}
      <JSONData>
        {productList}  
      </JSONData>
      {productList && <Button variant="contained" color="primary" onClick={handleUpdateLinkUrl} style={{marginLeft : "auto", display : "block"}}>
        Cập nhật Linkurl
      </Button>}    
    </ProductListWrapper>  
        
  )
}

export default ProductList
