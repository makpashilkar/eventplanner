import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate } from "react-router-dom";

const ViewBookings = () => {
  // navigate
  const navigate = useNavigate();

  const [searchData, setSearchData] = useState({
    bookingId: "",
    bookingData: "",
    infoMessages: "",
    deleteMessage: "",
  });

  const [messages] = useState({
    INFO: "Booking has been deleted, Please refresh the page.",
  });

  const [enable, setEnable] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchData({ ...searchData, [name]: value });
    console.log(name, value);
  };

  const handleAction = (action) => {
    const name = action.target.name;

    switch (name) {
      case "searchBooking":
        axios
          .get(
            `https://event-planner-mock-server.onrender.com/bookings/${searchData.bookingId}`
          )
          .then((response) => {
            setSearchData({
              ...searchData,
              bookingData: response.data,
              infoMessages: "",
            });
            setEnable(true);
          })
          .catch((error) => {
            setSearchData({
              bookingId: "",
              bookingData: "",
              infoMessages: `Reservation for Booking ID ${searchData.bookingId} not found. Please Enter Correct Number`,
            });
            setEnable(false);
          });

        break;
      case "deleteBooking":
        // to be impleted  delete methods
        axios
          .delete(
            `https://event-planner-mock-server.onrender.com/bookings/${searchData.bookingId}`
          )
          .then((response) => {
            setSearchData({
              bookingId: "",
              bookingData: "",
              infoMessages: messages.INFO,
            });
            setEnable(false);
          });
        break;

      case "updateBooking":
        // code 2.0 to send params with ID
        navigate("/updateBooking");

        break;
      default:
        break;
    }
    console.log(name);
  };
  return (
    <>
      <div>
        <Card className="bg-dark text-white">
          <Card.Header as="h5">Search for Bookings</Card.Header>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Enter Booking ID
            </InputGroup.Text>
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              name="bookingId"
              value={searchData.bookingId}
              onChange={(event) => handleChange(event)}
              type="number"
            />
            <Button
              variant="primary"
              name="searchBooking"
              onClick={(event) => handleAction(event)}
            >
              Search
            </Button>
          </InputGroup>
        </Card>
        <br />
        <br />
        {/* conditional rendering of error */}
        {searchData.infoMessages !== "" && (
          <span>
            <Alert variant="danger">{searchData.infoMessages}</Alert>
          </span>
        )}
        <br />
        <br />
        <Table striped="columns">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Buffet Name</th>
              <th>Email ID</th>
              <th>Plate Count</th>
              <th>Booking Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{searchData.bookingData.id}</td>
              <td>{searchData.bookingData.buffetName}</td>
              <td>{searchData.bookingData.emailId}</td>
              <td>{searchData.bookingData.plateCount}</td>
              <td>{searchData.bookingData.bookedOn}</td>
              <td colSpan={2}>
                {/* Mount update component with ID */}
                <Link to={"/updateBooking/" + searchData.bookingId}>
                  <Button
                    variant="info"
                    className="mx-2"
                    name="updateBooking"
                    onClick={(event) => handleAction(event)}
                    disabled={!enable}
                  >
                    Update
                  </Button>
                </Link>

                <Button
                  variant="danger"
                  name="deleteBooking"
                  onClick={(event) => handleAction(event)}
                  disabled={!enable}
                >
                  Delete
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ViewBookings;
