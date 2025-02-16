import styled from "styled-components";
import { DirectoryItem } from "./directory-item";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export type Category = {
  id: number;
  title: string;
  imageUrl: string;
  route: string;
};

const categories: Category[] = [
  {
    id: 1,
    title: "hats",
    imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
    route: "/shop/hats",
  },
  {
    id: 2,
    title: "jackets",
    imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
    route: "/shop/jackets",
  },
  {
    id: 3,
    title: "sneakers",
    imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
    route: "/shop/sneakers",
  },
  {
    id: 4,
    title: "womens",
    imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
    route: "/shop/womens",
  },
  {
    id: 5,
    title: "mens",
    imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
    route: "/shop/mens",
  },
];

export const Directory = (): JSX.Element => {
  return (
    <Container>
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </Container>
  );
};
