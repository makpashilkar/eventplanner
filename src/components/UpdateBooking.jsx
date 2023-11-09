import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { useParams } from "react-router-dom";

const UpdateBooking = (props) => {
  const { id } = useParams();
  console.log(id);
  // let bookUpdateId = props.id;
  // console.log(bookUpdateId);

  const [booking, setBooking] = useState("");

  const [buffetName, setBuffetName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [plateCount, setPlateCount] = useState("");
  const [bookedOn, setBookedOn] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [messages] = useState({
    ERROR: "Something Went Wrong",
    MANDATORY: "Enter all feilds",
  });

  useEffect(() => {
    axios
      .get(`https://event-planner-mock-server.onrender.com/bookings/${id}`)
      .then((response) => {
        setBooking(response.data);
        console.log(response.data);
        setBuffetName(response.data.buffetName);
        setEmailId(response.data.emailId);
        setPlateCount(response.data.plateCount);
        setBookedOn(response.data.bookedOn);
      })
      .catch((error) => {
        setErrorMessage(messages.ERROR);
        console.log(error);
      });
  }, [id, messages.ERROR]);

  // console.log(booking);

  const update = (e) => {
    e.preventDefault();
    let newBooking = {
      buffetName: buffetName,
      emailId: emailId,
      plateCount: plateCount,
      bookedOn: bookedOn,
      id: booking.id,
    };

    // if (Object.values(newBooking).some((val) => val === ""))
    if (Object.values(newBooking).some((val) => val === "")) {
      setErrorMessage(messages.MANDATORY);
    } else {
      setErrorMessage("");
      axios
        .put(`https://event-planner-mock-server.onrender.com/bookings/${id}`, newBooking)
        .then((response) => {
          setSuccessMessage("Booking updated Successfully" + response.data.id);
        })
        .catch((err) => console.log(err));
    }
    console.log(newBooking);
  };

  return (
    <div>
      <Card className="mt-8 mx-8 bg-dark text-white">
        <Card.Body>
          <h3>{booking.id}</h3>
          <Form>
            <Form.Group>
              <Form.Label>Buffet Name</Form.Label>
              <Form.Select
                placeholder={buffetName}
                name="buffetName"
                onChange={(e) => setBuffetName(e.target.value)}
              >
                <option value="" hidden>
                  {buffetName}
                </option>
                <option value="southfestival">South Festival</option>
                <option value="northfestival">North Festival</option>
                <option value="eastfestival">East Festival</option>
                <option value="westfestival">West Festival</option>
                <option value="chinesefestival">Chinese Festival</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder={booking.emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Plate Count</Form.Label>
              <Form.Control
                type="number"
                placeholder={booking.plateCount}
                onChange={(e) => setPlateCount(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                update(e);
              }}
            >
              Update
            </Button>
          </Form>
          {errorMessage && (
            <span>
              <Alert variant="danger">{errorMessage}</Alert>
            </span>
          )}
          {successMessage && (
            <span>
              <Alert variant="success">{successMessage}</Alert>
            </span>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default UpdateBooking;
