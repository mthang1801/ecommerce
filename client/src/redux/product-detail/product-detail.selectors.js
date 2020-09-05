import { createSelector } from "reselect";

const selectProductDetail = (state) => state.productDetail;

export const selectProdudctDetailLoading = createSelector(
  selectProductDetail,
  (productDetail) => productDetail.loading
);

export const selectProductDetailData = createSelector(
  selectProductDetail,
  (productDetail) => productDetail.product
);

export const selectProductDetailError = createSelector(
  selectProductDetail,
  (productDetail) => productDetail.error
);

export const selectProductDetailRelatedProducts = createSelector(
  selectProductDetail,
  (productDetail) => productDetail.relatedProducts
);
