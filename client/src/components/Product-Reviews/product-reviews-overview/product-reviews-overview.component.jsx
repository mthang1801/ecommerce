import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../context/app-viewport.context";
import {
  ProductReviewsOverviewWrapper,
  Row,
  Grid,
  Image,
  TextArea,
  CompleteReview,
} from "./product-reviews-overview.styles";
import { selectProductReviewsItem } from "../../../redux/product-reviews/product-reviews.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import Loader from "../../UI/loader/loader.component";
import {
  postReviewsProduct,
  updateReviewsProduct,
} from "../../../utils/connectDB";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    verticalAlign: "middle",
    fontSize : "1.25em"
  },
}));
const ProductReviewsOverview = ({ productReviews, history }) => {
  const classes = useStyles();
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [completeReview, setCompleteReview] = useState(false);
  useEffect(() => {
    console.log(productReviews);
    if (productReviews.my_vote_review) {
      setStars(productReviews.my_vote_review.value);
    }
    if (productReviews.my_comment_review) {
      setComment(productReviews.my_comment_review.text);
    }
  }, [productReviews]);
  const [mobileView, setMobileView] = useState(window.innerWidth < 600);
  const [tabletView, setTabletView] = useState(
    window.innerWidth < 992 && window.innerWidth >= 600
  );
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!comment && !stars) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [comment, stars]);
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
    //if user has review, update product
    if (productReviews.my_vote_review || productReviews.my_comment_review) {
      let updatedMyReview = {};
      if (productReviews.my_comment_review) {
        updatedMyReview.updatedComment = {
          ...productReviews.my_comment_review,
        };
      }
      if (productReviews.my_vote_review) {
        updatedMyReview.updatedVote = { ...productReviews.my_vote_review };
      }
      updateReviewsProduct(productReviews._id, stars, comment, updatedMyReview)
        .then((data) => {
          setCompleteReview(true);
        })
        .catch((err) => {
          setError(err);
        });
    } else {
      postReviewsProduct(productReviews._id, stars, comment)
        .then((data) => {
          setCompleteReview(true);
        })
        .catch((err) => {
          setError(err);
        });
    }
  };
  return (
    <ProductReviewsOverviewWrapper>
      {completeReview ? (
        <CompleteReview>
          <h3>Cám ơn bạn sự đóng góp của bạn về sản phẩm.</h3>
          <Button
            variant="contained"
            color="primary"
            startIcon={<HomeIcon />}
            onClick={() => history.push("/")}
          >
            Trang chủ
          </Button>
        </CompleteReview>
      ) : (
        <React.Fragment>
          {loading ? (
            <Loader />
          ) : (
            <React.Fragment>
              {error ? (
                <div style={{ textAlign: "center", margin: "1.5rem auto" }}>
                  {" "}
                  <h4 style={{ color: "#dd2222" }}>{error}</h4>
                </div>
              ) : null}
              <Row>
                <Grid
                  width={25}
                  mobileView={mobileView}
                  tabletView={tabletView}
                >
                  <Image
                    src={`data:${productReviews.images[0].mimetype};base64,${productReviews.images[0].data}`}
                  />
                </Grid>
                <Grid
                  witdh={75}
                  mobileView={mobileView}
                  tabletView={tabletView}
                >
                  <h3>{productReviews.name}</h3>
                  <p>
                    Người đăng SP :{" "}
                    <Link
                      to={`/user/${productReviews.user._id}`}
                    >{`${productReviews.user.information.first_name} ${productReviews.user.information.last_name}`}</Link>
                  </p>
                  <p>
                    Ngày đăng :{" "}
                    <span>
                      {new Date(productReviews.createdAt).toLocaleString()}
                    </span>
                  </p>
                  <p>
                    Đánh giá từ người dùng :{" "}
                    {productReviews.stars ? (
                      <React.Fragment>
                        <Rating
                          name="read-only"
                          value={productReviews.stars}
                          precision={0.5}
                          readOnly
                          className={classes.root}
                        />
                        <span style={{color : "#909090" , fontSize: "0.9em"}}>({productReviews.numberOfVotes} đánh giá)</span>
                      </React.Fragment>
                    ) : (
                      <span style={{ color: "#dd2222" }}>Chưa có đánh giá</span>
                    )}
                  </p>
                  <p>
                    <Link to={`${productReviews.linkUrl}`}>
                      Chi tiết sản phẩm
                    </Link>
                  </p>
                </Grid>
              </Row>
              <Row style={{ flexDirection: "column" }}>
                <h3>Đánh giá sản phẩm</h3>
                <Rating
                  name="half-rating"
                  value={+stars}
                  precision={0.5}
                  onChange={(e) =>
                    setStars(e.target.value < 1 ? 1 : e.target.value)
                  }
                />
                <TextArea
                  placeholder="Đóng góp của bạn về sản phẩm"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                />
              </Row>
              <Row>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ display: "inline-block" }}
                  disabled={disabled}
                  onClick={handleSendReviews}
                >
                  Gửi đánh giá
                </Button>
              </Row>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </ProductReviewsOverviewWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  productReviews: selectProductReviewsItem,
});
export default connect(mapStateToProps)(withRouter(ProductReviewsOverview));
