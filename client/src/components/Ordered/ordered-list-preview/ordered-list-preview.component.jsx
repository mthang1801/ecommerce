import React, { useState } from "react";
import { FaLongArrowAltDown } from "react-icons/fa";
import {
  OrderedListPreviewContainer,
  Row,
  LeftMainContent,
  RightMainContent,
  MoreOrderedDetails,
  OrderedItemDetails,
  ItemImage
} from "./ordered-list-preview.styles";
import { CSSTransition } from "react-transition-group";
import {Table, Thead, Th, Td, Tbody} from "../../UI/custom-table/custom-table.styles";
import {Link} from "react-router-dom"
const OrderedListPreview = ({ orderedItem }) => {
  console.log(orderedItem);
  const [show, setShow] = useState(false);

  return (
    <OrderedListPreviewContainer>
      <Row>
        <LeftMainContent>
          Thời gian đặt hàng :{" "}
          <strong>{new Date(orderedItem.createdAt).toLocaleString()}</strong>
        </LeftMainContent>
        <RightMainContent>
          <strong>{orderedItem.totalPrice.toLocaleString("es-AR")} VND</strong>
        </RightMainContent>
      </Row>
      <Row>
        <LeftMainContent>
          Tình trạng đơn hàng :{" "}
          <strong>
            {orderedItem.status === "active" ? (
              <span style={{ color: "#dd2222" }}>Đang vận chuyển</span>
            ) : (
              <span style={{ color: "green" }}>Hoàn tất</span>
            )}
          </strong>
        </LeftMainContent>
      </Row>
      <Row>
        <LeftMainContent>
          {orderedItem.time_complete ? (
            <span>
              Ngày giao hàng :{" "}
              <strong>
                {new Date(orderedItem.time_complete).toLocaleString()}
              </strong>
            </span>
          ) : (
            <span>
              Ngày giao hàng dự kiến :{" "}
              <strong>
                {new Date(orderedItem.time_expire).toLocaleString()}
              </strong>
            </span>
          )}
        </LeftMainContent>
      </Row>
      <Row>
        <LeftMainContent>
          Hình thức đặt hàng :{" "}
          <strong>
            {orderedItem.method_paymen === "cod"
              ? "Thanh toán bằng tiền mặt"
              : "Thanh toán qua thẻ"}
          </strong>
        </LeftMainContent>
      </Row>
      <MoreOrderedDetails onClick={() => setShow(!show)}>
        Chi tiết hóa đơn <FaLongArrowAltDown style={{ fontWeight: "bold" }} />
      </MoreOrderedDetails>

      <OrderedItemDetails show={show}>
        <CSSTransition in={show} timeout={250} unmountOnExit classNames="alert">
          <Table>
            <Thead>
              <Row>
                <Th width={12}></Th>
                <Th width={25}>Tên SP</Th>
                <Th width={10}>Số lượng</Th>
                <Th width={15}>Đơn giá</Th>
                <Th width={8}>Khuyến mãi</Th>
                <Th width={20}>Thành tiền</Th>
                <Th width={10}></Th>
              </Row>
            </Thead>
            <Tbody>
            {orderedItem.products.map((product, id) => (              
                <Row key={product._id}>
                  <Td width={12}>
                    <Link to={product.linkUrl}>
                    <ItemImage
                      src={`data:${product.image.mimetype};base64,${product.image.data}`}
                    />
                    </Link>
                   
                  </Td>
                  <Td width={25}>{product.name}</Td>
                  <Td width={10}>{product.quantity}</Td>
                  <Td width={15}>{product.price.toLocaleString("es-AR")}</Td>
                  <Td width={8}>{product.discount}</Td>
                  <Td width={20}>
                    {((product.price * product.quantity * (100 - product.discount)) / 100).toLocaleString("es-AR")}
                  </Td>
                  <Td width={10}>
                    <Link to="/">Đánh giá</Link>
                  </Td>
                </Row>                      
            ))}
            </Tbody>
          </Table>
        </CSSTransition>
      </OrderedItemDetails>
    </OrderedListPreviewContainer>
  );
};

export default OrderedListPreview;
