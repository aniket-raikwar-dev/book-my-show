import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import TicketBookingModal from "./TicketBookingModal";

const EventDetails = () => {
  const { id } = useParams();
  const [eventsData, setEventsData] = useState([]);
  const [event, setEvent] = useState(null);
  const [isTicketBooked, setIsTicketBooked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState(0);

  const showModal = () => {
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
    if (event.tickets >= selectedTickets) {
      const updatedEvents = eventsData.map((e) =>
        e.id === event.id ? { ...e, tickets: e.tickets - selectedTickets } : e
      );
      setEventsData(updatedEvents);
      localStorage.setItem("eventsData", JSON.stringify(updatedEvents));
      setIsTicketBooked(true);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 2000);
    }
  };

  useEffect(() => {
    const storedEvents = localStorage.getItem("eventsData");
    const events = storedEvents ? JSON.parse(storedEvents) : [];
    setEventsData(events);
  }, []);

  useEffect(() => {
    if (eventsData.length > 0) {
      const currentEvent = eventsData.find((e) => e.id === parseInt(id));
      setEvent(currentEvent);
    }
  }, [eventsData, id]);

  return (
    <div className="container">
      <div className="event-container">
        <div className="flex">
          <h1 className="head">Event Details</h1>
          <Link to="/">
            <button>Back</button>
          </Link>
        </div>
        <div>
          <div className="banner"></div>

          <div className="event-detail-head">
            <div className="event-title-lg">
              {event?.name}
              <span className="date">{event?.date}</span>
              <span className="date">{event?.time}</span>
            </div>
            <button onClick={showModal} className="book-btn-lg">
              Book Tickets
            </button>
          </div>
          <p className="text">
            Venue: <span>{event?.venue}</span>
          </p>
          <p className="text">
            Tickets Available: <span>{event?.tickets}</span>
          </p>

          <p className="text">
            About the movie: <br />
            <span>
              Get ready for RamCharan`s undeniable swag - he`s about to own the
              screen and slay it like never before!
            </span>
          </p>
        </div>
      </div>
      <TicketBookingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        currentEvent={event}
        selectedTickets={selectedTickets}
        handleTicketSelect={handleTicketSelect}
        handleBookTickets={handleBookTickets}
        isTicketBooked={isTicketBooked}
      />
    </div>
  );
};

export default EventDetails;
