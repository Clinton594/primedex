import React from "react";
import Spinner from "./Spinner";

export default function Fieldset({ title, children, value, isLoading }) {
  return (
    <fieldset>
      <legend>
        {title} : {isLoading ? <Spinner size="sm" animation="grow" variant="primary" /> : <strong>{value}</strong>}
      </legend>
      <div>{children}</div>
    </fieldset>
  );
}

export const Row = ({ children }) => {
  return <div className="row">{children}</div>;
};

export const Col = ({ sm, md, lg, children }) => {
  const val = sm || md || lg;
  const cls = sm !== undefined ? "sm" : md !== undefined ? "md" : "lg";
  return <div className={`col-${cls}-${val}`}>{children}</div>;
};

export const Card = ({ children }) => {
  return <div className="card">{children}</div>;
};

export const Form = ({ children }) => {
  return <form className="d-flex justify-content-between align-items-end w-100 p-4">{children}</form>;
};

export const FormElement = ({ className, name, type, placeholder, disabled, value, label, onChange }) => {
  return (
    <div className={`form-group ${className || ""}`}>
      <label htmlFor={name}>{label}</label>
      <div className={type === "switch" && "switch"}>
        <input
          type={type === undefined ? "input" : type === "switch" ? "checkbox" : type}
          className="form-control px-4"
          id={name}
          name={name}
          onChange={onChange}
          defaultValue={value || ""}
          placeholder={placeholder === undefined ? "" : placeholder}
          disabled={disabled === undefined ? false : disabled}
        />
        {type === "switch" && (
          <div>
            <span></span>
          </div>
        )}
      </div>
    </div>
  );
};

export const Container = ({ children }) => {
  return <div className="container">{children}</div>;
};

export const Button = ({ children, disabled, variant, type }) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} d-flex mb-3`}
      disabled={disabled === undefined ? false : disabled}
    >
      {children}
    </button>
  );
};
