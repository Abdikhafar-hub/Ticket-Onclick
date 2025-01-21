import React, { useState, useEffect } from "react";
import "./EventsPage.css"; // Import the custom CSS file
import event from "../assets/wetransfer_3-jpg_2024-11-08_0922/event.jpg";
import khabib from "../assets/wetransfer_3-jpg_2024-11-08_0922/Khabib vs McGregor.jpg";
import football from "../assets/wetransfer_3-jpg_2024-11-08_0922/football.jpg";
import { useNavigate } from "react-router-dom";

function EventsPage() {
  const navigate = useNavigate();
  const addToCalendar = (even) => {
    console.log(even);
    const eventname = encodeURIComponent(even.name);
    const eventStartDate = encodeURIComponent(`${even.date}T${even.time}`); // Start date in ISO format
    const eventEndDate = encodeURIComponent("2024-11-8T19:00:00"); // End date in ISO format
    const eventDescription = encodeURIComponent(even.description);
    const eventLocation = encodeURIComponent(even.location);

    const calendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${eventname}&dates=${eventStartDate}/${eventEndDate}&details=${eventDescription}&location=${eventLocation}`;

    window.open(calendarUrl, "_blank");
  };
  const [events, setEvents] = useState([]);
  let dummyEvents = [
    {
      id: 1,
      name: "MAN U - ARSENAL",
      description: "LOCATION ACCESSIBLE AND STEP FREE",
      date: "2024-11-08",
      time: "14:00",
      location: "Venue Location",
      capacity: 25,
      image_url: football,
      cost: 12,
      category: "sport",
    },
    {
      id: 2,
      name: "McGregor vs Khabib ",
      description: "LOCATION ACCESSIBLE AND STEP FREE",
      date: "2024-11-09",
      time: "14:00",
      location: "Venue Location",
      capacity: 25,
      image_url: khabib,
      cost: 30,
      category: "sport",
    },
    {
      id: 3,
      name: "LAKERS VS WARRIORS",
      description: "LOCATION ACCESSIBLE AND STEP FREE",
      date: "2024-11-10",
      time: "14:00",
      location: "Venue Location",
      capacity: 25,
      image_url: event,
      cost: 13,
      category: "sport",
    },
  ];
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(
          "https://ticket-onclick.onrender.com/event/all"
        ); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEvents(data); // Assuming data is an array of card objects
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    fetchCards();
  }, []);
  let categories = [
    "sport",
    "technology",
    "culture",
    "fashion",
    "expo",
    "agriculture",
    "festival",
  ];
  events.push(...dummyEvents);

  return (
    <div className="container-fluid ticket-page-container">
      {" "}
      <div className="row">
        {" "}
        <div className="col">
          {categories.map((category) => {
            return (
              <div className="container " key={category}>
                {" "}
                {/* Added key for React element uniqueness */}
                <div className="row">
                  <div className="col">
                    <h1 id={category} className="sport-headings">
                      {category}
                    </h1>
                  </div>
                </div>
                {events.filter((event) => event.category == category).length >
                0 ? (
                  events
                    .filter((event) => event.category == category)
                    .map((event) => (
                      <div
                        key={event.id}
                        onClick={() =>
                          navigate(`/buying/${event.id}`, {
                            state: { event },
                          })
                        }
                        className="eventcard row d-flex justify-content-between align-items-center events-container p-2"
                      >
                        <div className="col">
                          <img
                            className="img-fluid event-img"
                            src={event.image_url}
                            alt={event.name}
                          />
                        </div>
                        <div className="col participants">
                          <p>{event.name}</p>
                          <p>Date: {event.date}</p>
                          <p>Time: {event.time}</p>
                          <p style={{ fontWeight: "600" }}>
                            Cost: ${event.cost}
                          </p>
                          <p className="description">{event.description}</p>
                        </div>
                        <div className="col">
                          <p>{event.location}</p>
                        </div>
                        <div className="col d-flex gap-3">
                          <div className="capacity p-2 rounded">
                            {event.capacity}{" "}
                            <i className="fa-solid fa-user-group"></i>
                          </div>
                          <div
                            onClick={() => addToCalendar(event)}
                            className="capacity p-2 rounded"
                          >
                            Save
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="eventcard row d-flex justify-content-between align-items-center events-container p-2">
                    <h2 style={{color:"black"}} className="sport-headings m-0 ">
                      Not availabe Coming soon...
                    </h2>
                  </div>
                )}
              </div>
            );
          })}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
export default EventsPage;
