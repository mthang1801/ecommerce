import React,  {useState } from "react";
import SalesOff from "../../Layout/sales-off/sale-off.component";
import BestSellerProducts from "../../Layout/best-seller-products/best-seller-products.component";
import TopRatedProducts from "../../Layout/top-rated-products/top-rated-products.component";
import { ProductTypeRightSideWrapper } from "./product-type-right-side.styles";
import TaskBar from "../../Layout/taskbar/taksbar.component";
import { default as Products } from "../../Layout/products/products.container";
import Pagination from "../../Layout/pagination/pagination.component";
import { setCurrentPage } from "../../../redux/product-type/product-type.actions";
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
} from "../../../redux/product-type/product-type.selectors";
import {withRouter} from "react-router-dom"
const ProductTypeRightSide = ({
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
  const [initialPage, setInitialPage] = useState(true);
  const movePage = page => {      
    const categoryPath = location.pathname.split("/")[1];   
    const productTypePath = location.pathname.split("/")[2];
    history.push(`/${categoryPath}/${productTypePath}/products?page=${page}`);
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
    <ProductTypeRightSideWrapper>
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
          {productList.length ? (
            <Products
              mobileView={mobileView}
              tabletView={tabletView}
              productList={productList}
            />
          ) : null }
          {numPages > 0 ? (
            <Pagination currentPage={currentPage} numPages={numPages}  handlePageClick={handlePageClick}/>
          ) : null}
        </React.Fragment>
      )}
    </ProductTypeRightSideWrapper>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductTypeRightSide));
