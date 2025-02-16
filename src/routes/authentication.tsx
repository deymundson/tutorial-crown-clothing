import styled from "styled-components";
import { SignInForm, SignUpForm } from "../components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 900px;
  margin: 30px auto;
`;

const Authentication = (): JSX.Element => {
  return (
    <Container>
      <SignInForm />
      <SignUpForm />
    </Container>
  );
};

export default Authentication;
