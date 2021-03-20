import React, {useEffect} from 'react'
import Layout from "../containers/Layout"
import Banner from "../components/Home/Banner";
import ProductPorfolio from "../components/Home/ProductPorfolioContainer"
import Products from "../components/Home/Products"
import {fetchHomeContentList} from "../redux/home/home.actions"
import {selectHomePageIsFetched} from "../redux/home/home.selectors"
import {createStructuredSelector} from "reselect"
import {connect} from "react-redux"
const Demo = ({isFetched,fetchHomeContentList }) => {  
  useEffect(() => {
    if(!isFetched){
      fetchHomeContentList();
    }
  },[isFetched])

  
  return (
    <Layout>
      <Banner/>
      <ProductPorfolio/>
      <Products/>
    </Layout>
  )
}

const mapStatesToProps = createStructuredSelector({
  isFetched : selectHomePageIsFetched
})
const mapDispatchToProps = dispatch => ({
  fetchHomeContentList : () => dispatch(fetchHomeContentList())
})
export default connect(mapStatesToProps,mapDispatchToProps)(Demo)
