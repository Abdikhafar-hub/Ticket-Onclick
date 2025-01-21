import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { persistor, store } from "../store";
// import sport1 "../assets/wetransfer_3-jpg_2024-11-08_0922/-4.jpg"

import "./Navbar.css";
import { useSelector } from "react-redux";

function Navbar() {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dat = useSelector((state) => state.data.data);
  let userDetails = dat && dat ? dat : null;

  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    store.dispatch({ type: "CLEAR_DATA" });
    persistor.purge();
    persistor.flush().then(() => {
      setLoading(true);
      localStorage.removeItem("token");
      localStorage.removeItem("persist:root");
      localStorage.removeItem("reduxState");
      setIsLoggedIn(false);
      setTimeout(() => {
        navigate("/");
        setLoading(false);
      }, 2000);
    });
  };
  const handleOrganizer = () => {
    if (userDetails.organizer) {
      setLoading(true);
      setTimeout(() => {
        navigate("/organizer/active");
        setLoading(false);
      }, 2000);
    } else {
      const userConfirmed = confirm(
        "Would you like to join Ticket as an organizer?"
      );
      if (userConfirmed) {
        alert("You are an organizer!");

        const updateUserStatus = async () => {
          try {
            const response = await fetch(
              `http://127.0.0.1:5000/user/${userDetails.id}`,
              {
                method: "PATCH",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ organizer: "true" }), // Send as string "true"
              }
            );

            if (response.ok) {
              const data = await response.json();
              alert("You are now an organizer!");
              navigate("/organizer/active");
            } else {
              const data = await response.json();
              alert(
                data.message ||
                  "Failed to become an organizer. Please try again."
              );
            }
          } catch (error) {
            console.error("Error updating user:", error);
            alert("An error occurred. Please try again later.");
          }
        };

        updateUserStatus();
      } else {
        alert("You chose not to join as an organizer.");
      }
    }
  };

  const handleCategoryClick = (route) => {
    navigate("/");
    setTimeout(() => {
      const categoriesElement = document.getElementById(route);
      if (categoriesElement) {
        categoriesElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };
  const handleClick = (route) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(route);
    }, 2000);
  };
  const path = location.pathname;
  return (
    <>
      {!location.pathname.includes("/organizer") ? (
        <nav className="navbar bg-light">
          <div className="container-fluid rounded-lg navbar-ground p-4 mx-md-5 mt-md-3 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <div className="logo me-5 " onClick={() => handleClick("/")}>
                <h1 className="ticket">TICKET</h1>
                <h1 className="onclick shadow">ONCLICK</h1>
              </div>
              <div className="page-name d-flex gap-5 mx-5 align-items-center">
                <li
                  onClick={() => handleClick("/")}
                  className={location.pathname == "/" ? "active" : ""}
                >
                  HOME
                </li>
                <li
                  onClick={() => handleClick("/events")}
                  className={location.pathname == "/events" ? "active" : ""}
                >
                  EVENTS
                </li>
                <li
                  className=""
                  onClick={() => handleCategoryClick("categories")}
                >
                  CATEGORIES
                </li>
                <li className="" onClick={() => handleCategoryClick("about")}>
                  ABOUT US
                </li>
              </div>
            </div>
            <div className="buttons">
              {isLoggedIn ? (
                <div className="">
                  <button
                    className="btn btn-secondary"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasWithBothOptions"
                    aria-controls="offcanvasWithBothOptions"
                  >
                    <i className="fa-regular fa-user"></i>{" "}
                  </button>

                  <div
                    className="offcanvas offcanvas-end"
                    data-bs-scroll="true"
                    tabIndex="-1"
                    id="offcanvasWithBothOptions"
                    aria-labelledby="offcanvasWithBothOptionsLabel"
                  >
                    <div className="offcanvas-header sidebar-header">
                      <h5
                        className="offcanvas-title"
                        id="offcanvasWithBothOptionsLabel"
                      >
                        Ticket Oclick{" "}
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="offcanvas-body sidebar d-flex flex-column align-items-center">
                      <div
                        data-bs-dismiss="offcanvas"
                        className="dash-item p-2 px-5 my-2"
                        onClick={() => navigate("/profile")}
                      >
                        My profile
                      </div>
                      <div className="line "></div>

                      <div
                        data-bs-dismiss="offcanvas"
                        className="dash-item p-2 px-5 my-2"
                        onClick={() => {
                          handleOrganizer();
                        }}
                      >
                        Organizer Mode
                      </div>
                      <div className="line "></div>

                      <div
                        data-bs-dismiss="offcanvas"
                        className="dash-item p-2 px-5 my-2"
                        onClick={handleLogout}
                      >
                        Logout{" "}
                        <i
                          style={{ color: "rgb(228, 226, 226)" }}
                          className="mx-2 fa-solid fa-arrow-right-from-bracket"
                        ></i>
                      </div>
                      <div className="line"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {location.pathname != "/login" && (
                    <button
                      className="btn  rounded-pill me-3 px-4"
                      onClick={() => {
                        handleClick("/login");
                      }}
                    >
                      Login
                    </button>
                  )}

                  {location.pathname != "/register" && (
                    <button
                      onClick={() => {
                        handleClick("/register");
                      }}
                      className="btn rounded-pill px-3"
                    >
                      Register
                    </button>
                  )}
                </>
              )}
            </div>
          </div>{" "}
          {loading && (
            <div className="spinner-overlay">
              <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </nav>
      ) : (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid organizer-bar">
            <span className="navbar-brand logo me-5">Organizer Mode</span>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse ms-aut " id="navbarNav">
              <ul className="navbar-nav gap-3">
                <li
                  onClick={() => navigate("/organizer")}
                  className={
                    path == "/organizer"
                      ? "selected nav-item nav-link"
                      : "nav-item nav-link"
                  }
                >
                  Add event
                </li>
                <li
                  onClick={() => navigate("/organizer/active")}
                  className={
                    path == "/organizer/active"
                      ? "selected nav-item nav-link"
                      : "nav-item nav-link"
                  }
                >
                  Active event
                </li>
                <li
                  onClick={() => navigate("/organizer/history")}
                  className={
                    path == "/organizer/history"
                      ? "selected nav-item nav-link"
                      : "nav-item nav-link"
                  }
                >
                  Event History
                </li>
                <li onClick={() => navigate("/")} className="nav-item nav-link">
                  Log Out
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
