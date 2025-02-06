import "./button.scss";

const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
  default: "",
};

export const Button = ({ buttonType, children, ...otherProps }) => {
  return (
    <button
      className={`button ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};
