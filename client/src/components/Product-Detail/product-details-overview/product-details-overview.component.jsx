import React, {useState, useContext, useEffect}  from 'react'
import {ProductDetailOverViewContainer} from "./product-details-overview.styles";
import MainInterface from "../main-interface/main-interface.component";
import Taskbar from "../taskbar/taskbar.component";
import ListRelatedProducts from "../list-related-products/list-related-products.component";
import AppContext from "../../../context/app-viewport.context";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectProductDetailData, selectProductDetailRelatedProducts} from "../../../redux/product-detail/product-detail.selectors"
const ProductDetailOverView = ({product, relatedProducts}) => {
  const [mobileView, setMobileView] = useState(window.innerWidth < 768);
  const [tabletView, setTabletView] = useState(window.innerWidth < 992 && window.innerWidth >= 768);
  const width = useContext(AppContext);
  useEffect(() => {
    if (width < 768) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
    if (width < 992 && width >= 768) {
      setTabletView(true);
    } else {
      setTabletView(false);
    }
  }, [width]); 
  return (
    <ProductDetailOverViewContainer>
      <MainInterface mobileView={mobileView} tabletView={tabletView} product={product}/>
      <Taskbar mobileView={mobileView} tabletView={tabletView} product={product}/>
      <ListRelatedProducts mobileView={mobileView} tabletView={tabletView} productList={relatedProducts}/>
    </ProductDetailOverViewContainer>
  )
}
const mapStateToProps = createStructuredSelector({
  product : selectProductDetailData,
  relatedProducts : selectProductDetailRelatedProducts
})

export default connect(mapStateToProps)(ProductDetailOverView)
