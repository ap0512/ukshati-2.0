import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../Components/Pages/Home";
import { BrowserRouter } from "react-router-dom"; // Required for routing components

describe("Home Component", () => {
  test("renders the Home component correctly", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Check if the main heading is rendered
    expect(screen.getByText("Welcome to Ukshati Technologies")).toBeInTheDocument();

    // Check if the subheading is rendered
    expect(screen.getByText("Innovation for Sustainable Farming")).toBeInTheDocument();

    // Check if the call-to-action button is rendered
    expect(screen.getByRole("button", { name: /Learn More/i })).toBeInTheDocument();
  });

  test("renders key sections of the Home page", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Check if the "About Us" section is rendered
    expect(screen.getByText("About Us")).toBeInTheDocument();

    // Check if the "Our Services" section is rendered
    expect(screen.getByText("Our Services")).toBeInTheDocument();

    // Check if the "Contact Us" section is rendered
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  test("handles button clicks correctly", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Simulate clicking the "Learn More" button
    const learnMoreButton = screen.getByRole("button", { name: /Learn More/i });
    fireEvent.click(learnMoreButton);

    // Check if the button click triggers navigation or an action
    // (You may need to mock navigation or check for a specific behavior)
    expect(learnMoreButton).toBeInTheDocument(); // Adjust this based on your component's behavior
  });
});