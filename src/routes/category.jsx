import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import { ProductCard, Spinner } from "../components";
import { selectCategoriesByTitle, selectCategoriesLoading } from "../store";

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
  const loading = useSelector(selectCategoriesLoading);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(categories[category] || []);
  }, [categories, category]);

  if (loading) {
  }

  return (
    <>
      <Title>{category}</Title>
      {loading ? (
        <Spinner />
      ) : (
        <Container>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Container>
      )}
    </>
  );
};
