import styled from "styled-components";
import { DirectoryItem } from "./directory-item";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Directory = ({ categories }) => {
  return (
    <Container>
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </Container>
  );
};
