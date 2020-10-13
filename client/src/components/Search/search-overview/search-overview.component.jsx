import React , {useState} from 'react'
import {SearchOverViewWrapper, Grid} from "./search-overview.styles";
import {selectProductList,selectCurrentPage, selectNumPages, selectNumProducts} from "../../../redux/search/search.selectors"
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import ProductItem from "../../UI/product-item/product-item.component"
import Pagination from "../../Layout/pagination/pagination.component";
import {withRouter} from "react-router-dom";
const SearchOverView = ({productList, currentPage, numPages, history,numProducts}) => { 
  const [initialPage, setInitialPage] = useState(true);
  const movePage = page => {   
    const urlParams = new URLSearchParams(window.location.search);
    const searchKey = urlParams.get("key");  
    history.push(`/search?key=${searchKey}&page=${page}`)    
  }
  
  const handlePageClick = (data) => {   
    if(!initialPage){
      const currentPage = data.selected +1 ; 
      return movePage(currentPage);
    }
    return setInitialPage(!initialPage);
  };
  if(!productList.length){
    return <SearchOverViewWrapper><h4>Không tìm thấy sản phẩm </h4></SearchOverViewWrapper>
  }
  return (
    <SearchOverViewWrapper>
        <h4 style={{color: "#3f51b5"}}>Tìm thấy {numProducts} kết quả</h4>
          <Grid>
          {productList.map(product => (
            <ProductItem key={product._id} product={product}/>
          ))}
        </Grid>
           {numPages > 0 ? (
            <Pagination currentPage={currentPage} numPages={numPages} handlePageClick={handlePageClick} />
          ) : null}        
        
    </SearchOverViewWrapper>
  )
}
const mapStateToProps = createStructuredSelector({
  productList : selectProductList,
  currentPage : selectCurrentPage,
  numPages : selectNumPages,
  numProducts : selectNumProducts
})

export default connect(mapStateToProps)(withRouter(SearchOverView))
