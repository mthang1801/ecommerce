import React,  {useState } from "react";
import { ManufactorRightSideWrapper } from "./manufactor-right-side.styles";
import TaskBar from "../../Layout/taskbar/taksbar.component";
import { default as Products } from "../../Layout/products/products.container";
import Pagination from "../../Layout/pagination/pagination.component";
import { setCurrentPage } from "../../../redux/manufactor/manufactor.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {  
  selectProductList,
  selectNumPages,
  selectNumProducts,
  selectCurrentPage,  
} from "../../../redux/manufactor/manufactor.selectors";
import {withRouter} from "react-router-dom"
const ManufactorRightSide = ({
  mobileView,
  tabletView,  
  productList,
  numProducts,
  currentPage,
  numPages,
  history,
  location,
  setCurrentPage
}) => {
  const [initialPage, setInitialPage] = useState(true);
  const movePage = page => {           
    const manufactorPath = location.pathname.split("/")[2];    
    const urlParams = new URLSearchParams(window.location.search);
    const min_price = +urlParams.get("min_price");
    const max_price = +urlParams.get("max_price");  
    if(max_price > 0 ){
      history.push(`/manufactor/${manufactorPath}/products?page=${page}&min_price=${min_price}&max_price=${max_price}`);
    }else{
      history.push(`/manufactor/${manufactorPath}/products?page=${page}`);
    }   
    setCurrentPage(page);
  }
  const handlePageClick = (data) => {       
    if(!initialPage){
      const currentPage = data.selected +1 ; 
      return movePage(currentPage);
    }
    return setInitialPage(!initialPage);
  };
  return (
    <ManufactorRightSideWrapper>
      {
      !productList.length ? (
        <h4>Không tìm thấy sản phẩm nào</h4>
      ) : (
        <React.Fragment>          
          <TaskBar
            mobileView={mobileView}
            tabletView={tabletView}
            numProducts={numProducts}
          />
          {productList.length && (
            <Products
              mobileView={mobileView}
              tabletView={tabletView}
              productList={productList}
            />
          )}
          {numPages > 0 && (
            <Pagination currentPage={currentPage} numPages={numPages}  handlePageClick={handlePageClick}/>
          )}
        </React.Fragment>
      )}
    </ManufactorRightSideWrapper>
  );
};
const mapStateToProps = createStructuredSelector({ 
  productList: selectProductList,
  numProducts: selectNumProducts,
  numPages: selectNumPages,
  currentPage: selectCurrentPage,
});

const mapDispatchToProps = dispatch => ({
  setCurrentPage : page => dispatch(setCurrentPage(page))
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ManufactorRightSide));
