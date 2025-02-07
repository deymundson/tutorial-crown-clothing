import { SignInForm, SignUpForm } from "../../components";

import "./authentication.scss";

export const Authentication = () => {
  return (
    <div className="authentication">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};
