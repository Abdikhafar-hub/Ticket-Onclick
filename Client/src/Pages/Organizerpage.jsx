import React, { useState, useEffect } from "react";

import "./Organizerpage.css";
import { useSelector } from "react-redux";

const EventForm = ({ onAddEvent }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dater, setDater] = useState("");
  const [location, setLocation] = useState("");
  const [cost, setCost] = useState("");
  const [capacity, setCapacity] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  const organizerData = useSelector((state) => state.data.data);
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous error
    const organizer_id = organizerData.id;
    console.log(organizer_id);

    const date = dater.split("T")[0];
    const time = dater.split("T")[1];

    const eventData = {
      name,
      description,
      date,
      location,
      cost,
      capacity,
      category,
      organizer_id,
      time,
    };

    try {
      const response = await fetch("https://ticket-onclick.onrender.com/event", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      onAddEvent(data); // Call the callback function to update the event list

      // Reset form fields
      setName("");
      setDescription("");
      setDater("");
      setLocation("");
      setCost("");
      setCapacity("");
      setCategory("");
    } catch (err) {
      console.error("Error adding event", err);
      // Set a user-friendly error message
      setError("Failed to add event. Please try again.");
    }
  };

  return (
    <form className="d-flex flex-column mt-5 gap-3" onSubmit={handleSubmit}>
      <input
        className="form-control"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value.toUpperCase())}
        placeholder="Event Title"
        required
      />
      <input
        className="form-control"
        type="datetime-local"
        value={dater}
        onChange={(e) => setDater(e.target.value)}
        required
      />
      <input
        className="form-control"
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Event Location"
        required
      />
      <input
        className="form-control"
        type="number"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        placeholder="Capacity"
        required
      />
      <input
        className="form-control"
        type="number"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        placeholder="Cost"
        required
      />
      <select
        className="form-control"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="" disabled>
          Select Category
        </option>
        <option value="sport">Sport</option>
        <option value="technology">Technology</option>
        <option value="culture">Culture</option>
        <option value="fashion">Fashion</option>
        <option value="expo">Expo</option>
        <option value="festival">Festival</option>
        <option value="agriculture">Agriculture</option>
      </select>
      <textarea
        className="form-control"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Small Description"
        required
      />
      {error && <p className="text-danger">{error}</p>}
      <button className="btn btn-danger submit-event" type="submit">
        Add Event
      </button>
    </form>
  );
};

const OrganizerPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://ticket-onclick.onrender.com/events");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events", err);
        // setError("Failed to fetch events. Please try again.");
      }
    };

    fetchEvents();
  }, []);

  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <div className="container-fluid organizer-add">
      <div className="container">
        <h1 className="text-center mt-3">Add Events</h1>
        <EventForm onAddEvent={handleAddEvent} />
      </div>
    </div>
  );
};

export default OrganizerPage;
