import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { emailSignInStart, googleSignInStart } from "../store";
import { Button } from "./button";
import { FormInput } from "./form-input";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;

  h2 {
    margin: 10px 0;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const defaultFormFields = {
  email: "",
  password: "",
};

export const SignInForm = () => {
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(emailSignInStart(email, password));
    resetFormFields();
  };

  const handleSignInWithGoogle = () => dispatch(googleSignInStart());

  return (
    <Container>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          name="email"
          type="email"
          required
          onChange={handleChange}
          value={email}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          required
          onChange={handleChange}
          value={password}
        />
        <ButtonsContainer>
          <Button type="submit">Sign in</Button>
          <Button
            type="button"
            buttonType="google"
            onClick={handleSignInWithGoogle}
          >
            Use Google
          </Button>
        </ButtonsContainer>
      </form>
    </Container>
  );
};
