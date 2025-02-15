import { InputHTMLAttributes } from "react";
import styled, { css } from "styled-components";

const subColor = "grey";
const mainColor = "black";

const shrinkLabelStyles = css`
  top: -14px;
  font-size: 12px;
  color: ${mainColor};
`;

const Container = styled.div`
  position: relative;
  margin: 45px 0;
`;

type LabelProps = {
  $shrink: boolean;
};

const Label = styled.label<LabelProps>`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;

  ${({ $shrink }) => $shrink && shrinkLabelStyles}
`;

const Input = styled.input`
  background: none;
  background-color: white;
  color: ${subColor};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${subColor};
  margin: 25px 0;

  &:focus {
    outline: none;
  }

  &:focus ~ ${Label} {
    ${shrinkLabelStyles}
  }

  &[type="password"] {
    letter-spacing: 0.3em;
  }
`;

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  value: string;
};

export const FormInput = ({ label, ...inputProps }: Props): JSX.Element => {
  return (
    <Container>
      <Input {...inputProps} />
      {label && <Label $shrink={!!inputProps.value.length}>{label}</Label>}
    </Container>
  );
};
