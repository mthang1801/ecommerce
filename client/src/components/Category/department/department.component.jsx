import React from "react";
import { DepartmentWrapper, DepartmentLabel } from "./department.styles";
import { getCategoryData } from "../../../utils/connectDB";
import { CustomLink } from "../../UI/custom-link/custom-link.component";
const Deparment = ({productTypeList}) => {
  const categoryList = getCategoryData();
  return (
    <DepartmentWrapper>
      <DepartmentLabel>Danh mục sản phẩm</DepartmentLabel>
      {categoryList &&
        productTypeList.map((productType) => (
          <CustomLink
            key={productType._id}
            to={productType.linkUrl}
            style={{
              fontWeight: "normal",
              textTransform: "capitalize",             
            }}
          >
            {productType.name} <span style={{color : "#757575", fontSize:"0.8em"}}>({productType.products.length})</span>
          </CustomLink>
        ))}
    </DepartmentWrapper>
  );
};

export default Deparment;
