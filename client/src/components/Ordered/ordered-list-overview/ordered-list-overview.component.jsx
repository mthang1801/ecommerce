import React from "react";
import { connect } from "react-redux";
import { selectOrderedList } from "../../../redux/ordered/ordered.selectors";
import { createStructuredSelector } from "reselect";
import {
  OrderedListOverviewContainer,
  Title,
  OrderedEmpty,
} from "./ordered-list-overview.styles";
import OrderedListPreview from "../ordered-list-preview/ordered-list-preview.component";
const OrderedListOverview = ({ orderedList }) => { 
  console.log(orderedList);
  return (
    <OrderedListOverviewContainer>
      <Title>Lịch sử giao dịch</Title>
      {orderedList.length ? (
        orderedList.map((orderedItem) => (
          <OrderedListPreview key={orderedItem._id} orderedItem={orderedItem} />
        ))
      ) : (
        <OrderedEmpty>Bạn chưa có đơn đặt hàng nào.</OrderedEmpty>
      )}
    </OrderedListOverviewContainer>
  );
};
const mapStateToProps = createStructuredSelector({
  orderedList: selectOrderedList,
});
export default connect(mapStateToProps)(OrderedListOverview);
