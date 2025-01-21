// src/Components/Footer.js
import React from "react";
import "./Footer.css";
import footerimage from "../assets/wetransfer_3-jpg_2024-11-08_0922/Screenshot 2024-11-12 at 10.31.57 PM.png";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  return (
    <>
      {!location.pathname.includes("/organizer") && (
        <footer className="footer ">
          <img className="mb-5  img-fluid imgfooter" src={footerimage} alt="" />
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="pb-5 mx-5 container-fluid">
                  <div className="row">
                    {/* Company Information */}
                    <div className="footer-logo col-md-4 mb-3">
                      <h1 className="mb-3">TICKET ONCLICK</h1>
                      <p
                        style={{ fontSize: "20px" }}
                        className="mb-4 inquiries-paragraph"
                      >
                        For inquiries, wholesale ticket purchases, and
                        accessibility arrangements, please reach out to us at:
                      </p>
                      <p>
                        <i className="me-3 fa-solid fa-mobile"></i>+254 7123456
                      </p>
                      <p>
                        <i className="me-3 fa-solid fa-envelope"></i>
                        HELLO@TICKETONCLICK.COM
                      </p>
                    </div>

                    <div className="col-md-4"></div>

                    {/* Social Media Links */}
                    <div className="col-md-4  mb-3">
                      <h5 style={{ color: "white" }}>Follow Us</h5>
                      <div className="d-flex flex-column social-icons">
                        <a href="https://facebook.com" className="footer-icon">
                          <i className="mx-2 fa-brands fa-facebook"></i>
                          @ticketonclick_fb
                        </a>
                        <a href="https://twitter.com" className="footer-icon">
                          <i className="mx-2 fa-brands fa-x-twitter"></i>
                          @ticketonclick_x
                        </a>
                        <a href="https://instagram.com" className="footer-icon">
                          <i className="mx-2 fa-brands fa-instagram"></i>
                          @ticketonclick_ig
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}

export default Footer;
