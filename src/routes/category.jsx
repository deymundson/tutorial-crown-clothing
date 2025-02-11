import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import { ProductCard } from "../components";
import { selectCategoriesByTitle } from "../store";

const Title = styled.h2`
  font-size: 28px;
  text-align: center;
  margin-bottom: 25px;
  text-transform: uppercase;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;
`;

export const Category = () => {
  const { category } = useParams();
  const categories = useSelector(selectCategoriesByTitle);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(categories[category] || []);
  }, [categories, category]);

  return (
    <>
      <Title>{category}</Title>
      <Container>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Container>
    </>
  );
};
