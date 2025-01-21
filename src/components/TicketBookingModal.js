import React from "react";
import { Modal } from "antd";
import BookedSuccessImg from "../assets/booked-success.svg";

const TicketBookingModal = ({
  isOpen,
  onClose,
  currentEvent,
  selectedTickets,
  handleTicketSelect,
  handleBookTickets,
  isTicketBooked,
}) => {
  return (
    <Modal
      title={`Book Tickets for ${currentEvent?.name}`}
      visible={isOpen}
      onCancel={onClose}
      footer={null}
    >
      {isTicketBooked ? (
        <div className="show-success">
          <img className="success-img" src={BookedSuccessImg} alt="" />
          <p className="success-text">
            Your <span>{selectedTickets} ticket </span>has been booked.{" "}
          </p>
        </div>
      ) : (
        <div>
          <h4 className="modal-head">Select the number of tickets:</h4>
          <div className="ticket-selection">
            {[...Array(10).keys()].map((i) => (
              <button
                key={i}
                className={`ticket-button ${
                  selectedTickets === i + 1 ? "ticket-selected" : ""
                }`}
                onClick={() => handleTicketSelect(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="selected-ticket-count">
            <p>Selected Tickets: {selectedTickets}</p>
          </div>

          {selectedTickets > currentEvent?.tickets && (
            <p className="red-alert">Sorry, You can't book that much ticket!</p>
          )}
          <button
            className="ticket-booked-button"
            onClick={handleBookTickets}
            disabled={selectedTickets > currentEvent?.tickets}
            style={{
              opacity: selectedTickets > currentEvent?.tickets ? 0.5 : 1,
            }}
          >
            Confirm Booking
          </button>
        </div>
      )}
    </Modal>
  );
};

export default TicketBookingModal;
