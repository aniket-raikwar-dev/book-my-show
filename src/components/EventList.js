import React, { useState } from "react";
import { events } from "../data";
import { Link } from "react-router-dom";
import TicketBookingModal from "./TicketBookingModal";

const EventList = () => {
  const [eventsData, setEventsData] = useState(events);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState(0);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isTicketBooked, setIsTicketBooked] = useState(false);

  const showModal = (event) => {
    setCurrentEvent(event);
    setIsModalOpen(true);
    setSelectedTickets(0);
    setIsTicketBooked(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTicketSelect = (ticketCount) => {
    setSelectedTickets(ticketCount);
  };

  const handleBookTickets = () => {
    if (currentEvent.tickets >= selectedTickets) {
      const updatedEvents = eventsData.map((event) =>
        event.id === currentEvent.id
          ? { ...event, tickets: event.tickets - selectedTickets }
          : event
      );
      setEventsData(updatedEvents);
      setIsTicketBooked(true);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 2000);
    }
  };

  return (
    <div className="container">
      <div className="event-container">
        <h1 className="head">Event List</h1>
        <div className="event-list-container">
          {eventsData.map((event) => (
            <div key={event?.id} className="event-card">
              <div
                className="event-poster"
                style={{ backgroundColor: "#d5d5d5" }}
              ></div>
              <div>
                <h3 className="event-title">{event.name}</h3>
                <div className="ticket-text">
                  Tickets Available: {event.tickets}
                </div>
              </div>
              <div className="btn-container">
                <Link to={`/event/${event.id}`}>
                  <button className="btn-view">View</button>
                </Link>

                <button className="btn-book" onClick={() => showModal(event)}>
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TicketBookingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        currentEvent={currentEvent}
        selectedTickets={selectedTickets}
        handleTicketSelect={handleTicketSelect}
        handleBookTickets={handleBookTickets}
        isTicketBooked={isTicketBooked}
      />
    </div>
  );
};

export default EventList;
