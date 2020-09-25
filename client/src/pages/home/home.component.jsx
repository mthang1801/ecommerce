import React, {useEffect} from 'react';
import {HomePageContainer} from "./home.styles";
import BannerOverview from "../../components/HomePage/banner-overview/banner-overview.component"
import {default as CategoriesSlider} from "../../components/HomePage/categories-slider/categories-slider.container";
import {default as FeaturedProductOverview} from "../../components/HomePage/featured-product-overview/featured-product-overview.container";
import MasterHeader from "../../components/Layout/master-header/master-header.component";
import {fetchHomeContentList} from "../../redux/home/home.actions"
import {connect} from "react-redux"
const HomePage = ({fetchHomeContentList}) => {  
  useEffect(() => {
    fetchHomeContentList();
  },[fetchHomeContentList])
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
const mapDispatchToProps = dispatch => ({
  fetchHomeContentList : () => dispatch(fetchHomeContentList())
})
export default connect(null, mapDispatchToProps)(HomePage)
