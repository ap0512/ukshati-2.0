import React from "react";
import { render, screen } from "@testing-library/react";
import Services from "../Components/Layouts/Services";

describe("Services Component", () => {
  test("renders the Services component correctly", () => {
    render(<Services />);

    // Check if the main heading is rendered
    expect(screen.getByText("Our Services")).toBeInTheDocument();

    // Check if the service descriptions are rendered
    expect(
      screen.getByText("We provide innovative solutions for sustainable farming.")
    ).toBeInTheDocument();

    // Check if specific services are listed
    expect(screen.getByText("Digital Farming Solutions")).toBeInTheDocument();
    expect(screen.getByText("IoT-Based Irrigation Systems")).toBeInTheDocument();
    expect(screen.getByText("Greenhouse Automation")).toBeInTheDocument();

    // Check if images are rendered
    const serviceImages = screen.getAllByRole("img");
    expect(serviceImages.length).toBeGreaterThan(0);
  });

  test("renders service cards with correct content", () => {
    render(<Services />);

    // Check if each service card has a title and description
    const serviceTitles = [
      "Digital Farming Solutions",
      "IoT-Based Irrigation Systems",
      "Greenhouse Automation",
    ];

    serviceTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });

    // Check if each card has a button (if applicable)
    const buttons = screen.getAllByRole("button", { name: /Learn more/i });
    expect(buttons.length).toBe(serviceTitles.length);
  });
});