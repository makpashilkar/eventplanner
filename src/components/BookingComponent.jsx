import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { validation } from "../validation/validation";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
const BookingComponent = () => {
  // for form control
  const [formData, setFormData] = useState({
    buffetName: "",
    bookedOn: "",
    emailId: "",
    plateCount: "",
  });

  // for formerrors
  const [formErrors, setFormErrors] = useState({
    buffetNameErrors: "",
    bookedOnErrors: "",
    emailIdErrors: "",
    plateCountErrors: "",
  });

  //state to check all fields validity boolean

  const [isValid, setIsValid] = useState(false);

  // state to hold error meessages

  const [meessages] = useState({
    EMAILID_ERROR: "Please enter valid email address",
    BUFFET_NAME_ERROR: "Please select Buffet Type",
    BOOKEDON_ERROR: "Booking date should be after today",
    PLATE_COUNT_ERROR: "Plate count should be 1 or More",
    ERROR: "Something went wrong",
    MANDATORY: "Enter all the Form field",
  });

  //states to hold error and success message and mandatory
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorsMessage] = useState("");
  const [, setMandatory] = useState(false);

  //   Handle change to get input data from form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }, validateField(name, value));
    console.log(name, value);
  };

  //   handle validation function

  const validateField = (name, value) => {
    let errors = formErrors;

    //setting error msg to errostate

    switch (name) {
      case "buffetName":
        if (!validation.validateBuffet(value)) {
          errors.buffetNameErrors = meessages.BUFFET_NAME_ERROR;
        } else {
          errors.buffetNameErrors = "";
        }
        break;
      case "emailId":
        if (!validation.validateEmail(value)) {
          errors.emailIdErrors = meessages.EMAILID_ERROR;
        } else {
          errors.emailIdErrors = "";
        }
        break;

      case "plateCount":
        if (!validation.validPlateCount(value)) {
          errors.plateCountErrors = meessages.PLATE_COUNT_ERROR;
        } else {
          errors.plateCountErrors = "";
        }
        break;

      case "bookedOn":
        if (!validation.validDate(value)) {
          errors.bookedOnErrors = meessages.BOOKEDON_ERROR;
        } else {
          errors.bookedOnErrors = "";
        }
        break;

      default:
        break;
    }

    //check if any of errors are true to set isValid state for button disable
    setFormErrors(errors);
    if (Object.values(formErrors).every((formErrors) => formErrors === "")) {
      setIsValid(true);
    } else setIsValid(false);
  };

  //handle Submit

  const handleSubmit = (e) => {
    console.log("submit clicked");
    e.preventDefault();
    if (Object.values(formData).some((val) => val === "")) {
      setMandatory(true);
      setErrorsMessage(meessages.MANDATORY);
      // console.log("in else mandatory");
    } else {
      axios
        .post(
          " https://event-planner-mock-server.onrender.com/bookings",
          formData
        )
        .then((response) => {
          setSuccessMessage(
            `Booking successfully created with Booking ID : ${response.data.id}`
          );
          console.log(response);
          setFormData({
            buffetName: "",
            bookedOn: "",
            emailId: "",
            plateCount: "",
          });
        })
        .catch((error) => {
          setErrorsMessage(meessages.ERROR);
          console.log(error);
        });
    }
  };

  return (
    <div>
      <div className="d-flex  justify-content-center  not-found-container mt-5">
        <Form onSubmit={(event) => handleSubmit(event)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => handleChange(e)}
              name="emailId"
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>

            {/* span to display error message */}
            <br />
            {formErrors.emailIdErrors && (
              <span style={{ color: "red" }}>{formErrors.emailIdErrors}</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSelect">
            <Form.Label>Buffet Name</Form.Label>
            <Form.Select name="buffetName" onChange={(e) => handleChange(e)}>
              <option disabled defaultValue>
                Please select Venue
              </option>
              <option value="southfestival">South Festival</option>
              <option value="northfestival">North Festival</option>
              <option value="eastfestival">East Festival</option>
              <option value="westfestival">West Festival</option>
              <option value="chinesefestival">Chinese Festival</option>
            </Form.Select>
            <br />
            {formErrors.buffetNameErrors && (
              <span style={{ color: "red" }}>
                {formErrors.buffetNameErrors}
              </span>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Plate Count</Form.Label>

            <Form.Control
              onChange={(e) => handleChange(e)}
              name="plateCount"
              type="number"
              placeholder="Number of plates"
            />

            <br />
            {formErrors.plateCountErrors && (
              <span style={{ color: "red" }}>
                {meessages.PLATE_COUNT_ERROR}
              </span>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Date</Form.Label>

            <Form.Control
              onChange={(e) => handleChange(e)}
              name="bookedOn"
              type="date"
              placeholder="Enter Date"
            />
            <br />
            {formErrors.bookedOnErrors && (
              <span style={{ color: "red" }}>{meessages.BOOKEDON_ERROR}</span>
            )}
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={!isValid}
            className="mt-5"
          >
            Submit
          </Button>
          {successMessage && (
            <span>
              <Alert variant="success">{successMessage}</Alert>
            </span>
          )}
          {errorMessage && (
            <span>
              <Alert variant="danger">{errorMessage}</Alert>
            </span>
          )}
        </Form>
      </div>
    </div>
  );
};

export default BookingComponent;
