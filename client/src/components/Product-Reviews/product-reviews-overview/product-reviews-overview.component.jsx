import React ,  {useState, useContext, useEffect} from 'react'
import AppContext from "../../../context/app-viewport.context";
import {ProductReviewsOverviewWrapper, Row, Grid, Image, TextArea} from "./product-reviews-overview.styles";
import {selectProductReviewsItem} from "../../../redux/product-reviews/product-reviews.selectors";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {Link} from "react-router-dom";
import Rating from '@material-ui/lab/Rating';
import Button from "@material-ui/core/Button";
import Loader from "../../UI/loader/loader.component";
const ProductReviewsOverview = ({productReviews}) => {
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [mobileView, setMobileView] = useState(window.innerWidth < 600);
  const [tabletView, setTabletView] = useState(window.innerWidth < 992 && window.innerWidth >= 600);  
  const [loading, setLoading] = useState(false);
  const width = useContext(AppContext);  
  useEffect(() => {
    if (width < 600) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
    if (width < 992 && width >= 600) {
      setTabletView(true);
    } else {
      setTabletView(false);
    }
  }, [width]); 
  const handleSendReviews = () => {
    setLoading(true);
  }
  if(loading){
    return <Loader/>
  }
  return (
    <ProductReviewsOverviewWrapper>
      <Row>
        <Grid width={25} mobileView={mobileView} tabletView={tabletView}>
          <Image src={`data:${productReviews.images[0].mimetype};base64,${productReviews.images[0].data}`}/>
        </Grid>
        <Grid witdh={75} mobileView={mobileView} tabletView={tabletView}>
          <h3>{productReviews.name}</h3>
          <p>Người đăng SP : <Link to={`/user/${productReviews.user._id}`}>{`${productReviews.user.information.first_name} ${productReviews.user.information.last_name}`}</Link></p>
          <p>Ngày đăng : <span>{new Date(productReviews.createdAt).toLocaleString()}</span></p> 
          <p>Đánh giá từ người dùng :  {productReviews.stars ? <Rating name="read-only" value={productReviews.stars} readOnly /> : <span style={{color: "#dd2222"}}>Chưa có đánh giá</span>}</p>
        </Grid>
      </Row>
     <Row style={{flexDirection: "column"}}>
       <h3>Đánh giá sản phẩm</h3>
       <Rating name="half-rating" defaultValue={stars} precision={0.5}  onChange={(e) => setStars(e.target.value<1 ? 1 : e.target.value)} />
       <TextArea placeholder="Đóng góp của bạn về sản phẩm" onChange={e => setComment(e.target.value)} value={comment}/>
     </Row>     
     <Row><Button variant="contained" color="primary" style={{display : "inline-block"}} onClick={handleSendReviews}>Gửi đánh giá</Button></Row>
    </ProductReviewsOverviewWrapper>
  )
}


const mapStateToProps = createStructuredSelector({
  productReviews : selectProductReviewsItem 
})
export default connect(mapStateToProps)(ProductReviewsOverview)
