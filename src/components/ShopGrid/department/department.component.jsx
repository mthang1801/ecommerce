import React from "react";
import { DeparmentContainer, DeparmentLabel } from "./department.styles";
import { getCategoryData } from "../../../utils/algorithms";
import { CustomLink } from "../../UI/custom-link/custom-link.component";
const Deparment = () => {
  const categoryList = getCategoryData();
  return (
    <DeparmentContainer>
      <DeparmentLabel>Danh mục sản phẩm</DeparmentLabel>
      {categoryList &&
        categoryList.map((category) => (
          <CustomLink
            key={category._id}
            to={category.linkUrl}
            style={{
              fontWeight: "normal",
              textTransform: "capitalize",
              fontSize: "1.1em",
            }}
          >
            {category.name}
          </CustomLink>
        ))}
    </DeparmentContainer>
  );
};

export default Deparment;
