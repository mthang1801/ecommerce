import React from "react";
import {
  Wrapper,
  ListProductGroups,
  ProductGroupItem,
  Title
} from "./styles/PortfolioCategoryItem.styles";

const PortfolioCategoryItem = ({ portfolioSlug, category }) => {
  const {slug, name, productGroups}  = category
  if(!productGroups?.length) return null;
  return (
    <Wrapper >
      <Title to={`${portfolioSlug}/${slug}`}>{name}</Title>
      { <ListProductGroups>
        {productGroups.map((productGroup) => (
          <ProductGroupItem key={`productGroupItem-${productGroup._id}`} to={`${portfolioSlug}/${slug}/${productGroup.slug}`}>
            {productGroup.name}
          </ProductGroupItem>
        ))}
      </ListProductGroups>
      }
    </Wrapper>
  );
};

export default PortfolioCategoryItem;
