import "./form-input.scss";

export const FormInput = ({ label, id, ...inputProps }) => {
  return (
    <div className="form-input">
      <input className="input" id={id} name={id} {...inputProps} />
      {label && (
        <label
          className={`label ${inputProps.value.length ? "shrink" : ""}`}
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </div>
  );
};
