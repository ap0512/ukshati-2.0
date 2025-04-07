import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../Components/Layouts/Footer";
import { BrowserRouter } from "react-router-dom"; // Required for NavLink

describe("Footer Component", () => {
  test("renders the footer correctly", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    // ✅ Check if the "Connect with us on social networks" text is present
    expect(screen.getByText(/Connect with us on social networks:/i)).toBeInTheDocument();

    // ✅ Check if company name exists
    expect(screen.getByText(/Company Name/i)).toBeInTheDocument();

    // ✅ Check if the Contact Us section exists
    expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();

    // ✅ Check if specific contact details are present
    expect(screen.getByText(/ukshati365@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByText(/\+91 8861567365/i)).toBeInTheDocument();

    // ✅ Check if the footer has at least one link
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
  });
});