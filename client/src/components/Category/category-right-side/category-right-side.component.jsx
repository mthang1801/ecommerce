import React , {useState } from "react";
import SalesOff from "../../Layout/sales-off/sale-off.component";
import BestSellerProducts from "../../Layout/best-seller-products/best-seller-products.component";
import TopRatedProducts from "../../Layout/top-rated-products/top-rated-products.component";
import { CategoryRightSideWrapper } from "./category-right-side.styles";
import TaskBar from "../../Layout/taskbar/taksbar.component";
import { default as Products } from "../../Layout/products/products.container";
import Pagination from "../../Layout/pagination/pagination.component";
import { connect } from "react-redux";
import { setCurrentPage } from "../../../redux/category/category.actions";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {
  selectDiscountProductList,
  selectBestSellerProducts,
  selectTopRatedProducts,
  selectProductList,
  selectNumPages,
  selectNumProducts,
  selectCurrentPage,
  selectProductsIsFilter,
} from "../../../redux/category/category.selectors";

const CategoryRightSide = ({
  mobileView,
  tabletView,
  discountProductList,
  bestSellerProductList,
  topRatedProductList,
  productList,
  numProducts,
  currentPage,
  numPages,
  location,
  history,
  setCurrentPage,
  isFilter
}) => {
  const [initialPage, setInitialPage] = useState(true);
  const movePage = page => {
    const pathName = location.pathname.split("/")[1];    
    const urlParams = new URLSearchParams(window.location.search);
    const min_price = +urlParams.get("min_price");
    const max_price = +urlParams.get("max_price"); 
    if(max_price > 0 ){
      history.push(`/${pathName}/products?page=${page}&min_price=${min_price}&max_price=${max_price}`);
    }else{
      history.push(`/${pathName}/products?page=${page}&`);
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
    <CategoryRightSideWrapper>
      {!discountProductList.length &&
      !bestSellerProductList.length &&
      !topRatedProductList.length &&
      !productList.length ? (
        <h4>Không tìm thấy sản phẩm nào</h4>
      ) : (
      <React.Fragment>
        {!isFilter ?  (<React.Fragment>
          {discountProductList.length? (
            <SalesOff
              mobileView={mobileView}
              tabletView={tabletView}
              productList={discountProductList}
            />
          ): null}
          {bestSellerProductList.length ? (
            <BestSellerProducts
              mobileView={mobileView}
              tabletView={tabletView}
              productList={bestSellerProductList}
            />
          ): null}
          {topRatedProductList.length ? (
            <TopRatedProducts
              mobileView={mobileView}
              tabletView={tabletView}
              productList={topRatedProductList}
            />
          ): null}
          </React.Fragment>) : null}

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
            <Pagination currentPage={currentPage} numPages={numPages} handlePageClick={handlePageClick} />
          )}
        </React.Fragment>
      )}
    </CategoryRightSideWrapper>
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
  isFilter : selectProductsIsFilter
});

const mapDispatchToProps = dispatch => ({
  setCurrentPage : page => dispatch(setCurrentPage(page))
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CategoryRightSide));
