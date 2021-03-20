import React from "react";
import { createStructuredSelector } from "reselect";
import { Wrapper } from "./styles/Products.styles";
import {
  selectProductsBestSeller,
  selectProductsFavorite,
  selectProductsLatest,
  selectProductsTopRated,
} from "../../redux/home/home.selectors";
import { connect } from "react-redux";
import ProductsSlider from "../Product/ProductsSlider";
import useLanguage from "../Global/useLanguage";
const Products = ({
  bestSellerProducts,
  favoriteProducts,
  latestProducts,
  topRatedProducts,
}) => {
  const { i18n, lang } = useLanguage();
  const { homePage } = i18n.store.data[lang].translation;
  return (
    <Wrapper>
      <section>
        {" "}
        {bestSellerProducts.length ? (
          <ProductsSlider
            title={homePage.bestSellerProducts}
            productList={bestSellerProducts}
          />
        ) : null}
      </section>
      <section>
        {favoriteProducts.length ? (
          <ProductsSlider
            title={homePage.favoriteProducts}
            productList={favoriteProducts}
          />
        ) : null}
      </section>
      <section>
        {latestProducts.length ? (
          <ProductsSlider
            title={homePage.latestProducts}
            productList={latestProducts}
          />
        ) : null}
      </section>
      <section>
        {topRatedProducts.length ? (
          <ProductsSlider
            title={homePage.topRatedProducts}
            productList={topRatedProducts}
          />
        ) : null}
      </section>
    </Wrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  bestSellerProducts: selectProductsBestSeller,
  favoriteProducts: selectProductsFavorite,
  latestProducts: selectProductsLatest,
  topRatedProducts: selectProductsTopRated,
});

export default connect(mapStateToProps)(Products);
