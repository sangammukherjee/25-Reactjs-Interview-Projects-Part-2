import { useState } from "react";
import './form.css'

function FormValidation() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    email: "",
  });

  function handleFormChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateInput(name, value);
  }

  function validateInput(getName, getValue) {
    switch (getName) {
      case "username":
        setErrors((prevErrors) => ({
          ...prevErrors,
          username:
            getValue.length < 3 ? "Username must be at least 3 characters" : "",
        }));

        break;
      case "email":
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(getValue)
            ? ""
            : "Invalid email address",
        }));

        break;
      case "password":
        setErrors((prevErrors) => ({
          ...prevErrors,
          password:
            getValue.length < 5 ? "Password must be at least 5 characters" : "",
        }));

        break;

      default:
        break;
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    // const validateErrors = {};

    // Object.keys(formData).forEach((dataItem) => {
    //   validateInput(dataItem, formData[dataItem]);
    //   if (errors[dataItem]) {
    //     validateErrors[dataItem] = errors[dataItem];
    //   }
    // });

    // setErrors((prevErrors) => ({
    //   ...prevErrors,
    //   ...validateErrors,
    // }));

    // if (Object.values(validateErrors).every((error) => error === "")) {
    //   //perform your form submission logic
    // } else {
    //   console.log("error is present. Please fix");
    // }
  }

  console.log(errors);

  return (
    <div className="form-validation-container">
      <h1>Simple Form Validation</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="input-wrapper">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleFormChange}
          />
          <span>{errors?.username}</span>
        </div>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleFormChange}
          />
          <span>{errors?.email}</span>
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleFormChange}
          />
          <span>{errors?.password}</span>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormValidation;
