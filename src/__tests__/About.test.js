import React from "react";
import { render, screen } from "@testing-library/react";
import About from "../Components/Pages/About";
import { BrowserRouter } from "react-router-dom"; // Required for Layout component

describe("About Component", () => {
  test("renders the About component correctly", () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    // Check if the logo is rendered
    const logo = screen.getByAltText("Ukshati Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute(
      "src",
      "https://www.gogreendrip.com/GoGreen/GoGreen/images/logowithleaf.png"
    );

    // Check if the main heading is rendered
    expect(
      screen.getByText("Ukshati Technologies Private Limited")
    ).toBeInTheDocument();

    // Check if the subheading is rendered
    expect(
      screen.getByText("Innovation for Sustainable Farming")
    ).toBeInTheDocument();

    // Check if the paragraphs are rendered
    expect(
      screen.getByText(
        /Established in 2017 and incorporated as a private limited company in 2022/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Our devices cater to gardens of all sizes, offering solutions like water tank-based systems/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Our automatic irrigation system offers real-time visibility and control/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /At Ukshati Technologies, we are dedicated to empowering farmers and households/i
      )
    ).toBeInTheDocument();
  });

  test("renders the layout wrapper", () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    // Check if the Layout component wrapper is rendered
    const layoutWrapper = screen.getByRole("main");
    expect(layoutWrapper).toBeInTheDocument();
  });
});