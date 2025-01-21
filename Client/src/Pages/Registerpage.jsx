import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import registerPicture from "../assets/wetransfer_3-jpg_2024-11-08_0922/Premium Vector � Event party ticket template.jpg"; // Add your image path here
// import "bootstrap/dist/css/bootstrap.min.css";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [notification, setNotification] = useState(""); // State for notifications
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setNotification(""); // Clear previous notifications

    // Log form data to console
    values["organizer"] = "False";
    console.log("Registering user:", values);

    // Send the form data to the backend
    fetch("https://ticket-onclick.onrender.com/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        setSubmitting(false);
        if (!response.ok) {
          throw new Error(
            "Failed to register. Please check your input and try again."
          );
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setNotification("Registration successful! You may now log in.");
          resetForm();
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      })
      .catch((error) => {
        console.error(error);
        setNotification("Failed Try again. NB/-cant register twice!");
        setSubmitting(false);
      });
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5">
      <h3 className="text-white font-weight-bold mb-4 text-center w-100">
        Register
      </h3>

      {/* Notification message */}
      {notification && (
        <div
          className="alert alert-info w-100 text-center"
          role="alert"
          style={{ maxWidth: "1000px" }}
        >
          {notification}
        </div>
      )}

      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "1000px" }}>
        <div className="row">
          <div className="col-md-6">
            <Formik
              initialValues={{
                name: "",
                email: "",
                phone: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="form-group mb-4">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      placeholder="Enter your name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <Field
                      type="text"
                      id="phone"
                      name="phone"
                      className="form-control"
                      placeholder="Enter your phone number"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter your password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="d-flex justify-content-center mt-4">
                    <button
                      type="submit"
                      className="btn  w-100"
                      style={{ maxWidth: "120px" }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Registering..." : "Register"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img
              src={registerPicture}
              alt="Register"
              className="image-fluid img-fluid rounded"
              style={{ maxWidth: "300px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
