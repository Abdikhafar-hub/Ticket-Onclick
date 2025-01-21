import React, { useState, useEffect } from "react";
import "./ActiveEvent.css";
// import "bootstrap/dist/css/bootstrap.min.css";

function ActiveEvent() {
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://ticket-onclick.onrender.com/event",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          throw new Error("some issues occured reload");
        }
        const data = await response.json();
        setEvents(data);

        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvents();
  }, []);
  console.log(events);

  return (
    <div className="profile-container p-4">
      <h1 className="profile-title">Active Events</h1>
      <hr className="my-4" />
      <div className="row">
        {events.map((event) => (
          <div key={event.id} className="col-md-4 mb-4">
            <div className="card naming-containers">
              <div className="card-body">
                <h2 className="card-title">{event.name}</h2>
                <p className="card-text">{event.description}</p>

                <p className="card-text">
                  {event.date}, {event.time}
                </p>
                <p className="card-text">Remaining Tickets:{event.capacity}</p>
                <p className="card-text">{event.location}</p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-outline-primary edit">
                    <i className="fa-solid fa-edit"></i> Edit Event
                  </button>
                  <button className="btn btn-outline-danger delete-container">
                    <i className="fa-solid fa-trash"></i> Delete Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActiveEvent;
