import React, { useState, useEffect } from "react";
import "./EventHistory.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

function EventHistory() {
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchPastEvents = async () => {
      const samplePastEvents = [
        {
          id: 1,
          title: "Tech Conference 2023",
          description: "A tech conference for industry professionals.",
          date: "2023-11-08T14:00:00Z",
          location: "Convention Center, Nairobi",
        },
        {
          id: 2,
          title: "Music Festival",
          description: "A day-long festival with multiple bands.",
          date: "2023-12-01T09:00:00Z",
          location: "City Park, Nairobi",
        },
        // Add more sample past events as needed
      ];
      setPastEvents(samplePastEvents);
    };

    fetchPastEvents();
  }, []);

  return (
    <div className="profile-container p-4">
      <h1 className="profile-title">Event History</h1>
      <hr className="my-4" />
      <div className="row">
        {pastEvents.map((event) => (
          <div key={event.id} className="col-md-6 mb-4">
            <div className="card naming-containers">
              <div className="card-body">
                <h2 className="card-title">{event.title}</h2>
                <p className="card-text">{event.description}</p>
                <p className="card-text">{new Date(event.date).toLocaleString()}</p>
                <p className="card-text">{event.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventHistory;
