import { Link } from "react-router";
import styled from "styled-components";
import { ProductCard } from "./product-card";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const Title = styled(Link)`
  font-size: 28px;
  margin-bottom: 25px;
  text-transform: uppercase;
  cursor: pointer;
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
`;

export const CategoryPreview = ({ title, products }) => {
  return (
    <Container>
      <h2>
        <Title to={`./${title}`}>{title}</Title>
      </h2>
      <ProductsContainer>
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ProductsContainer>
    </Container>
  );
};
