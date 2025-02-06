import { useState } from "react";
import {
  createUserAuthFromEmail,
  createUserFromAuth,
} from "../../backend/firebase";
import { Button } from "../button";
import { FormInput } from "../form-input";
import "./sign-up-form.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const { user } = await createUserAuthFromEmail(email, password);
      createUserFromAuth(user, { displayName });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, Email already in use");
        return;
      }
      console.error("Error creating user", error.message);
    }

    resetFormFields();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-form">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          id="displayName"
          required
          onChange={handleChange}
          value={displayName}
        />
        <FormInput
          label="Email"
          id="email"
          type="email"
          required
          onChange={handleChange}
          value={email}
        />
        <FormInput
          label="Password"
          id="password"
          type="password"
          required
          onChange={handleChange}
          value={password}
        />
        <FormInput
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          required
          onChange={handleChange}
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};
