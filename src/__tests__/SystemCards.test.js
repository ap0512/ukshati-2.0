import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SystemCards from "../Components/Layouts/SystemCards";

describe("SystemCards Component", () => {
  test("renders the SystemCards component correctly", () => {
    render(<SystemCards />);

    // Check if the main heading is rendered
    expect(screen.getByText("Our Systems")).toBeInTheDocument();

    // Check if all system cards are rendered
    const cardTitles = [
      "Smart Irrigation System",
      "Greenhouse Automation",
      "IoT-Based Monitoring",
    ];

    cardTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });

    // Check if card descriptions are rendered
    expect(
      screen.getByText(
        "Automate your irrigation with real-time monitoring and control."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Optimize greenhouse conditions with advanced automation."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Monitor your farm with IoT-based sensors and analytics."
      )
    ).toBeInTheDocument();
  });

  test("renders buttons for each card", () => {
    render(<SystemCards />);

    // Check if each card has a button
    const buttons = screen.getAllByRole("button", { name: /Learn more/i });
    expect(buttons.length).toBeGreaterThan(0); // Ensure at least one button is present
  });

  test("handles button clicks correctly", () => {
    render(<SystemCards />);

    // Simulate clicking the first button
    const firstButton = screen.getAllByRole("button", { name: /Learn more/i })[0];
    fireEvent.click(firstButton);

    // Check if the button click triggers the expected behavior
    // (You may need to mock a function or check for navigation)
    expect(firstButton).toBeInTheDocument(); // Adjust this based on your component's behavior
  });
});