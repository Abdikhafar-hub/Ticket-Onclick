import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./LoginPage.css"; // Import the CSS for login page
import loginPicture from "../assets/wetransfer_3-jpg_2024-11-08_0922/Beating the odds_.jpg"; // Adjust the path if necessary
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  // Use Formik hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      // Log the form data to the console
      console.log("Form Submitted:", values);

      // Send login data to the backend
      fetch("https://ticket-onclick.onrender.com//user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Response from Backend:", data);

          if (data.success) {
            setNotification("Successfully logged in!");

            localStorage.setItem("token", data.token);

            setTimeout(() => {
              navigate("/", { state: true });
              window.location.reload();
            }, 1000);
          } else {
            setNotification("Not registered or invalid credentials.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setNotification("An error occurred. Please try again.");
        });
    },
  });

  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5">
      <h3 className="text-black font-weight-bold mb-4 text-center w-100">
        Login
      </h3>
      {notification && (
        <div className="mt-3 text-center text-black">
          <strong>{notification}</strong>
        </div>
      )}
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "1000px" }}>
        <div className="row">
          <div className="col-md-6">
            <h4 className="text-center text-white">Login</h4>

            <hr />
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group mb-4">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="form-group mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger">{formik.errors.password}</div>
                ) : null}
              </div>
              <div className="d-flex justify-content-center mt-4">
                <button
                  type="submit"
                  className="btn w-100"
                  style={{ maxWidth: "120px" }}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img
              src={loginPicture}
              alt="Login"
              className="image-fluid img-fluid rounded"
              style={{ maxWidth: "300px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
