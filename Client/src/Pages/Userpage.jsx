import React, { useEffect, useState } from "react";
import avatar from "../assets/wetransfer_3-jpg_2024-11-08_0922/Screenshot from 2024-11-12 12-04-09.png";
import "./User.css"; // Fixed the import path by removing the space
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { persistor } from "../store";

function UserProfilePage() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const userdata = useSelector((state) => state.data.data);
  const [activeTickets, setActiveTickets] = useState([]);
  const token = localStorage.getItem("token");

  const [userDetails, setUserDetails] = useState(userdata);

  const [formData, setFormData] = useState({ ...userDetails });
  const [formErrors, setFormErrors] = useState({});
  const [activeSection, setActiveSection] = useState("profile"); // Default to profile details

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://ticket-onclick.onrender.com/ticket",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          throw new Error("some issues occured reload");
        }
        const data = await response.json();
        setActiveTickets(data);

        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvents();
  }, []);
  console.log(activeTickets);

  // const activeTickets = [
  //   {
  //     id: 1,
  //     eventName: "Tech Conference 2024",
  //     eventDate: "15th Jan 2024",
  //     venue: "Tech Hall, San Francisco",
  //     ticketLink: "#", // Link to view/download ticket
  //   },
  //   {
  //     id: 2,
  //     eventName: "Music Festival 2024",
  //     eventDate: "20th Feb 2024",
  //     venue: "Festival Grounds, LA",
  //     ticketLink: "#", // Link to view/download ticket
  //   },
  //   {
  //     id: 3,
  //     eventName: "Art Expo 2024",
  //     eventDate: "10th Mar 2024",
  //     venue: "Art Gallery, New York",
  //     ticketLink: "#", // Link to view/download ticket
  //   },
  // ];

  const handleEditProfile = () => {
    setFormData({ ...userDetails }); // Reset form data to current user details
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    const { name, email, phone, location } = formData;

    if (!name) errors.name = "Name is required";
    if (!email || !/\S+@\S+\.\S+/.test(email))
      errors.email = "Valid email is required";
    if (!phone) errors.phone = "Phone number is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveChanges = () => {
    if (validateForm()) {
      setUserDetails({ ...formData });
      setShowModal(false);
      console.log("Profile updated", formData);
    }
  };

  const handleLogout = () => {
    setLoading(true);
    persistor.purge();
    localStorage.removeItem("details");
    setTimeout(() => {
      navigate("/");
      setLoading(false);
      window.location.reload();
    }, 2000);
  };

  // Active Tickets Component
  const ActiveTickets = () => (
    <div className="container-fluid">
      <div className="row gap-3 profiled-tickets">
        {activeTickets.map((ticket, key) => (
          <div key={key} className="card col p-4">
            <h5 style={{ fontFamily: "Russo One" }}>{ticket.event.name}</h5>
            <p>
              <i className="fa-solid fa-calendar-days me-2"></i>
              {ticket.event.date}
              <i className="fa-solid fa-stopwatch mx-2"></i>
              {ticket.event.time}
            </p>
            <p>
              <i className="fa-solid fa-location-dot me-2"></i>
              {ticket.event.location}
            </p>
            <p className="view-event" onClick={() => navigate("/events")}>
              View Event
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  // Ticket History Component
  const TicketHistory = () => (
    <div>
      <p>No tickets found.</p>
    </div>
  );

  return (
    <div className="container-fluid profile-container p-5">
      <div className="row">
        <div className="col">
          <div id="user-profile" className="container">
            {/* Hero Section */}
            <div className="row">
              <div className="col col-md-2 profile-navigator m-5 p-3 rounded ">
                <h2 className="account-title">Account</h2>
                <p className="my-3" onClick={() => setActiveSection("profile")}>
                  Profile Details
                </p>
                <p
                  className="my-3"
                  onClick={() => setActiveSection("activeTickets")}
                >
                  Active Tickets
                </p>
                <p
                  className="my-3"
                  onClick={() => setActiveSection("ticketHistory")}
                >
                  Ticket History
                </p>
              </div>
              <div className="col pb-4">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col">
                      <h2 className="profile-title">
                        {activeSection === "profile"
                          ? "Profile Details"
                          : activeSection === "activeTickets"
                          ? "Active Tickets"
                          : "Ticket History"}
                      </h2>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      {activeSection === "profile" && (
                        <div>
                          <div className="d-flex align-items-center gap-4 my-3">
                            <img
                              className="img rounded-pill avatar"
                              src={avatar}
                              alt=""
                            />
                            <div>
                              <span className="owner rounded">Owner</span>
                              <p className="mb-0 mt-2">{userDetails.name}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div>
                                <p>Name</p>
                                <div className="naming-containers px-3 rounded-pill d-flex justify-content-between">
                                  <span>{userDetails.name}</span>
                                  <i className="fa-solid fa-lock"></i>
                                </div>
                              </div>
                            </div>
                            <div className="col">
                              <div>
                                <p>Email</p>
                                <div className="naming-containers px-3 rounded-pill d-flex justify-content-between">
                                  <span>{userDetails.email}</span>
                                  <i className="fa-solid fa-lock"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row my-3 gap-3">
                            <div className="naming-containers col p-3">
                              <p>
                                <i className="fa-solid fa-lock"></i>
                              </p>
                              <p>{userDetails.phone}</p>
                            </div>
                            <div
                              className="naming-containers col p-3 edit"
                              onClick={handleEditProfile}
                            >
                              <p>
                                <i className="fa-solid fa-pen"></i>
                              </p>
                              <p>Edit Details</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="naming-containers col-8 p-5 delete-container">
                              <p>
                                <i className="fa-solid fa-trash"></i>
                              </p>
                              <p>Delete Account</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {activeSection === "activeTickets" && <ActiveTickets />}
                      {activeSection === "ticketHistory" && <TicketHistory />}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Profile Modal */}
            {showModal && (
              <div
                className="modal show"
                style={{ display: "block" }}
                aria-labelledby="editProfileModalLabel"
                tabIndex="-1"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="editProfileModalLabel">
                        Edit Profile
                      </h5>
                      <button
                        type="button"
                        className="close"
                        onClick={handleCloseModal}
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">
                            Name
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              formErrors.name ? "is-invalid" : ""
                            }`}
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                          {formErrors.name && (
                            <div className="invalid-feedback">
                              {formErrors.name}
                            </div>
                          )}
                        </div>

                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                          <input
                            type="email"
                            className={`form-control ${
                              formErrors.email ? "is-invalid" : ""
                            }`}
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                          {formErrors.email && (
                            <div className="invalid-feedback">
                              {formErrors.email}
                            </div>
                          )}
                        </div>

                        <div className="mb-3">
                          <label htmlFor="phone" className="form-label">
                            Phone
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              formErrors.phone ? "is-invalid" : ""
                            }`}
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                          {formErrors.phone && (
                            <div className="invalid-feedback">
                              {formErrors.phone}
                            </div>
                          )}
                        </div>

                        <div className="mb-3">
                          <label htmlFor="location" className="form-label">
                            Location
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              formErrors.location ? "is-invalid" : ""
                            }`}
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                          />
                          {formErrors.location && (
                            <div className="invalid-feedback">
                              {formErrors.location}
                            </div>
                          )}
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCloseModal}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSaveChanges}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Loading Spinner */}
            {loading && (
              <div className="spinner-overlay">
                <div className="spinner-grow" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
