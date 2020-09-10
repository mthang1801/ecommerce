import React, {useEffect} from 'react'
import {ProductReviewsWrapper} from "./product-reviews.styles";
import {fetchProductReviews} from "../../redux/product-reviews/product-reviews.actions";
import {selectCurrentUser, selectUserLoading, selectUserFetched} from "../../redux/user/user.selectors"
import {selectProductReviewsItem, selectProductReviewsLoading, selectProductReviewsError} from "../../redux/product-reviews/product-reviews.selectors"
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import MasterHeader from "../../components/Layout/master-header/master-header.component"
import PageNotFound from "../page-not-found/page-not-found.component"
import Background from "../../components/Layout/background/background.component"
import Loader from "../../components/UI/loader/loader.component"
import {default as ProductReviews} from "../../components/Product-Reviews/product-reviews-overview/product-reviews-overview.container"
const ProductReviewsPage = ({fetchProductReviews, match, currentUser, userLoading, userFetched, productReviews, productReviewsLoading, productReviewsError}) => {
  useEffect(() => {       
    if(match.params.productId && userFetched){
      fetchProductReviews(match.params.productId);   
  }    
  } ,[fetchProductReviews, match.params, userFetched])
  if(productReviewsLoading){
    return <Loader/>
  }
  else if(!productReviewsLoading && !productReviews){
    return <PageNotFound/>
  }
  return (
    <ProductReviewsWrapper>
      <MasterHeader/>
      <Background label={`Đánh giá sản phẩm`}/> 
      <ProductReviews/>      
    </ProductReviewsWrapper>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser , 
  userLoading : selectUserLoading,
  userFetched : selectUserFetched,
  productReviews : selectProductReviewsItem, 
  productReviewsLoading : selectProductReviewsLoading,
  productReviewsError : selectProductReviewsError
})

const mapDispatchToProps = dispatch => ({
  fetchProductReviews : (productId) => dispatch(fetchProductReviews(productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductReviewsPage)
