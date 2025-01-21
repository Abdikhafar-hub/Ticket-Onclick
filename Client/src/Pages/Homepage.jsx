import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import topImage from "../assets/ticket design.jpg";
import technologyPhoto from "../assets/wetransfer_3-jpg_2024-11-08_0922/VirtuClear™ Linseneinsätze für die Oculus Quest 2.jpg";
import culturePhoto from "../assets/wetransfer_3-jpg_2024-11-08_0922/Black Magic - Issuu.jpg";
import fashionPhoto from "../assets/wetransfer_3-jpg_2024-11-08_0922/Unknown-4.jpg";
import sportsPhoto from "../assets/wetransfer_3-jpg_2024-11-08_0922/valentin-kremer-noqQBb1EKkc-unsplash.jpg";
import agriculturePhoto from "../assets/wetransfer_3-jpg_2024-11-08_0922/polina-kuzovkova-0OkidWKbO2Q-unsplash.jpg";
import expoPhoto from "../assets/wetransfer_3-jpg_2024-11-08_0922/Unknown-6.jpg";
import festivalsPhoto from "../assets/wetransfer_3-jpg_2024-11-08_0922/Your Complete Guide To The Best UK Festivals In 2019.jpg";
import footerPhoto from "../assets/Screenshot from 2024-11-11 23-22-51.png";
import "bootstrap/dist/css/bootstrap.css";

import "./Home.css";
import { useLocation, useNavigate } from "react-router-dom";

function Homepage() {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);

  if (!token) {
  } else {
    useEffect(() => {
      const getUser = async () => {
        try {
          const response = await fetch(
            "https://ticket-onclick.onrender.com/user",
            {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (!response.ok) {
            throw new Error("some issues occured reload");
          }
          const data = await response.json();
          dispatch({ type: "SET_DATA", payload: "" });
          dispatch({ type: "SET_DATA", payload: data });
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      };
      getUser();
    }, [dispatch]);
  }
  console.log(data);

  const location = useLocation();
  const navigate = useNavigate();
  const categories = [
    {
      image: technologyPhoto,
      name: "TECHNOLOGY",
      description: "TOMORROW IS TODAY",
    },
    {
      image: culturePhoto,
      name: "CULTURE",
      description: "I MEAN ALL OF US",
    },
    {
      image: sportsPhoto,
      name: "SPORT",
      description: "ALL ABOUT THE BEAUTIFUL GAMES",
    },
    {
      image: fashionPhoto,
      name: "FASHION",
      description: "NOT JUST ABOUT CLOTHES",
    },
    {
      image: expoPhoto,
      name: "EXPO",
      description: "CHEC US OUT",
    },
    {
      image: festivalsPhoto,
      name: "FESTIVAL",
      description: "PEOPLE AND MUSIC",
    },
    {
      image: agriculturePhoto,
      name: "AGRICULTURE",
      description: "BEYOND WHAT WE EAT",
    },
  ];
  const handleCategoryClick = (name) => {
    navigate("/events");
    setTimeout(() => {
      const categoriesElement = document.getElementById(name.toLowerCase());
      if (categoriesElement) {
        console.log(name.toLowerCase());

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

  return (
    <div id="home" className="container-fluid">
      <div className="row text-center my-3">
        <div className="col">
          <img className="top-image img-fluid" src={topImage} alt="Hero" />
        </div>
      </div>

      <div className="row d-flex justify-content-center">
        <div className="col-10 col-md-4 hero-text text-center px-5">
          <h1 className="fs-1  pt-3">TICKET ONCLICK</h1>
          <p className="forget-about">
            Forget about missing an event, forget about your personal details
            security. Get yourself a ticket with very little hassle only at a
            click.
          </p>
        </div>
      </div>

      {/* Categories Section */}
      <div className="row categories p-5">
        <div className="col">
          <div className="container">
            <div className="row">
              <div className="col">
                <h1 id="categories" className="category-heading">
                  CATEGORIES
                </h1>
              </div>
            </div>

            <div className="row py-5 d-flex category-body">
              {categories.map((category, index) => (
                <div
                  key={index}
                  onClick={() => handleCategoryClick(category.name)}
                  className="col-12 card the-card p-4 shadow"
                >
                  <img
                    className="img-fluid"
                    src={category.image}
                    alt={category.name}
                  />
                  <h3 className="category-name m-0 mt-2">{category.name}</h3>
                  <p className="category-description m-0">
                    {category.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="container-fluid">
            <div className="row" id="about">
              <div className="col-2 abou ">
                <h2 className="about-heading text-center">ABOUT</h2>
              </div>
              <div className="col">
                <div className="container pt-5">
                  <div className="row">
                    <div className="col rounded p-5 shadow-sm our-part">
                      <h5 className="">Our Story</h5>
                      <p>
                      At Ticket OnClick, we believe that memorable events start with seamless planning and effortless ticketing. Our journey began with a vision to simplify the way people organize and attend events. From intimate gatherings to grand celebrations, we strive to provide a platform that bridges the gap between event organizers and attendees. With passion and innovation at our core, we are here to turn your ideas into unforgettable experiences.


                      </p>
                      <h5 className="">Mission</h5>
                      <p>
                      Our mission is to empower event organizers and attendees by offering a reliable, user-friendly platform for managing events and ticketing. We aim to streamline the entire event process—from creating events to selling tickets—ensuring convenience, transparency, and satisfaction for everyone involved.


                      </p>
                      <h5 className="">Vision</h5>
                      <p>
                      We envision a world where every event, big or small, is just a click away. At Ticket OnClick, we aspire to be the go-to platform for event management and ticketing, fostering connections and creating memories. Through cutting-edge technology and exceptional service, we aim to redefine the way people experience events.
                      </p>
                    </div>
                    <div className="col">
                      {" "}
                      <div className="container-fluid">
                        <div className="row mb-3">
                          <div className="col reviews-section ">
                            <div className="d-flex align-items-center gap-2 justify-content-around p-3">
                              <img
                                className="img-fluid review-image"
                                src="https://images.unsplash.com/photo-1611432579699-484f7990b127?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGVhZHNob3R8ZW58MHx8MHx8fDA%3D"
                                alt=""
                              />
                              <p>
                                <i
                                  style={{ color: "white" }}
                                  className=" quotes fa-solid fa-quote-left"
                                ></i>{" "}
                                "Ticket OnClick made organizing my event effortless! From creating the event page to tracking ticket sales, everything was so seamless. Their platform is incredibly user-friendly, and the customer support team was always there to assist. Thanks to Ticket OnClick, my event was a huge success!"
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col p-5 statistics">
                            <div className="container-fluid">
                              <div className="row gap-5">
                                <div className="col static-numbers shadow text-center">
                                  <h2>
                                    300 <sup>+</sup>
                                  </h2>
                                  <p>Satisified Users</p>
                                </div>
                                <div className="col static-numbers shadow text-center">
                                  {" "}
                                  <h2>
                                    50 <sup>+</sup>
                                  </h2>
                                  <p>Certified Organizers</p>
                                </div>
                                <div className="col static-numbers shadow text-center">
                                  <h2>
                                    10 <sup>+</sup>
                                  </h2>
                                  <p>Solid Partnerships</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="spinner-overlay">
          <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Homepage;
