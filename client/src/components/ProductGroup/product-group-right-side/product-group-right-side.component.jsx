import React,  {useState, useRef, useEffect } from "react";
import SalesOff from "../../Layout/sales-off/sale-off.component";
import BestSellerProducts from "../../Layout/best-seller-products/best-seller-products.component";
import TopRatedProducts from "../../Layout/top-rated-products/top-rated-products.component";
import { ProductGroupRightSideWrapper } from "./product-group-right-side.styles";
import TaskBar from "../../Layout/taskbar/taksbar.component";
import { default as Products } from "../../Layout/products/products.container";
import Pagination from "../../Layout/pagination/pagination.component";
import { setCurrentPage } from "../../../redux/product-group/product-group.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectDiscountProductList,
  selectBestSellerProducts,
  selectTopRatedProducts,
  selectProductList,
  selectNumPages,
  selectNumProducts,
  selectCurrentPage,
} from "../../../redux/product-group/product-group.selectors";
import {withRouter} from "react-router-dom"
const ProductGroupRightSide = ({
  mobileView,
  tabletView,
  discountProductList,
  bestSellerProductList,
  topRatedProductList,
  productList,
  numProducts,
  currentPage,
  numPages,
  history,
  location,
  setCurrentPage
}) => {
  const productGroupRef = useRef(null);
  const [initialPage, setInitialPage] = useState(true);
  const movePage = page => {      
    const categoryPath = location.pathname.split("/")[1];   
    const productTypePath = location.pathname.split("/")[2];
    const productGroupPath = location.pathname.split("/")[4];
    const urlParams = new URLSearchParams(window.location.search);
    const min_price = +urlParams.get("min_price");
    const max_price = +urlParams.get("max_price");  
    if(max_price > 0){
      history.push(`/${categoryPath}/${productTypePath}/product-group/${productGroupPath}/products?min_price=${min_price}&max_price=${max_price}&page=${page}`);
    }else{
      history.push(`/${categoryPath}/${productTypePath}/product-group/${productGroupPath}/products?page=${page}`);
    }
    
    setCurrentPage(page);
  }
  useEffect(() => {
    if(productGroupRef.current){    
      window.scrollTo({
        top : productGroupRef.current.offsetTop,
        behavior : "auto"
      })
    }
  }, [productGroupRef, productList])
  const handlePageClick = (data) => {       
    if(!initialPage){
      const currentPage = data.selected +1 ; 
      return movePage(currentPage);
    }
    return setInitialPage(!initialPage);
  };
  return (
    <ProductGroupRightSideWrapper ref={productGroupRef}>
      {!discountProductList.length &&
      !bestSellerProductList.length &&
      !topRatedProductList.length&& 
      !productList ? (
        <h4>Không tìm thấy sản phẩm nào</h4>
      ) : (
        <React.Fragment>
          {discountProductList.length ? (
            <SalesOff
              mobileView={mobileView}
              tabletView={tabletView}
              productList={discountProductList}
            />
          ) : null}
          {bestSellerProductList.length ? (
            <BestSellerProducts
              mobileView={mobileView}
              tabletView={tabletView}
              productList={bestSellerProductList}
            />
          ) : null}
          {topRatedProductList.length ? (
            <TopRatedProducts
              mobileView={mobileView}
              tabletView={tabletView}
              productList={topRatedProductList}
            />
          ) : null}

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
    </ProductGroupRightSideWrapper>
  );
};
const mapStateToProps = createStructuredSelector({
  discountProductList: selectDiscountProductList,
  bestSellerProductList: selectBestSellerProducts,
  topRatedProductList: selectTopRatedProducts,
  productList: selectProductList,
  numProducts: selectNumProducts,
  numPages: selectNumPages,
  currentPage: selectCurrentPage,
});

const mapDispatchToProps = dispatch => ({
  setCurrentPage : page => dispatch(setCurrentPage(page))
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductGroupRightSide));
