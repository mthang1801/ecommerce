import React, {useEffect} from 'react';
import {HomePageContainer} from "./home.styles";
import BannerOverview from "../../components/HomePage/banner-overview/banner-overview.component"
import {default as CategoriesSlider} from "../../components/HomePage/categories-slider/categories-slider.container";
import {default as FeaturedProductOverview} from "../../components/HomePage/featured-product-overview/featured-product-overview.container";
import MasterHeader from "../../components/Layout/master-header/master-header.component";
import {fetchHomeContentList} from "../../redux/home/home.actions"
import {selectHomePageIsFetched, selectProductsFavorite} from "../../redux/home/home.selectors"
import {selectCurrentUser} from "../../redux/user/user.selectors"
import {createStructuredSelector} from "reselect"
import {connect} from "react-redux"
const HomePage = ({fetchHomeContentList, isFetched, currentUser, favoriteProducts}) => {  
  useEffect(() => {
    if(!isFetched || !favoriteProducts.length && currentUser && currentUser.favorite_products.length){      
      fetchHomeContentList();
    }    
  },[fetchHomeContentList, isFetched, currentUser, favoriteProducts])
  useEffect(() => {
    window.scrollTo({
      top : 0 ,
      behavior : "auto"
    })
  }, [])
  return (
    <HomePageContainer>      
      <MasterHeader/>
      <BannerOverview/>
      <CategoriesSlider />     
      <FeaturedProductOverview />
    </HomePageContainer>
  )
}
const mapStateToProps = createStructuredSelector({
  isFetched : selectHomePageIsFetched,
  currentUser : selectCurrentUser,
  favoriteProducts : selectProductsFavorite
})
const mapDispatchToProps = dispatch => ({
  fetchHomeContentList : () => dispatch(fetchHomeContentList())
})
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
