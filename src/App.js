import React from "react";
import BookingComponent from "./components/BookingComponent";
import ViewBookings from "./components/ViewBookings";
import UpdateBooking from "./components/UpdateBooking";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">Hotel Management App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link>
                  <Link to="/">Home</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/viewBookings">View</Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* <ViewBookings /> */}
        {/* <UpdateBooking /> */}
      </div>

      <Routes>
        <Route path="/" element={<BookingComponent />} />
        <Route path="/bookBuffet" element={<BookingComponent />} />
        <Route path="/viewBookings" element={<ViewBookings />} />
        <Route path="/updateBooking/:id" element={<UpdateBooking />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
