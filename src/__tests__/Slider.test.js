import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Slider from "../Components/Layouts/Slider";

describe("Slider Component", () => {
  test("renders the Slider component correctly", () => {
    render(<Slider />);

    // Check if the slider is rendered
    const slider = screen.getByRole("region", { name: /slider/i });
    expect(slider).toBeInTheDocument();

    // Check if all slides are rendered
    const slides = screen.getAllByRole("img");
    expect(slides.length).toBeGreaterThan(0); // Ensure at least one slide is present
  });

  test("navigates to the next slide when the next button is clicked", () => {
    render(<Slider />);

    // Check if the next button is rendered
    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeInTheDocument();

    // Simulate clicking the next button
    fireEvent.click(nextButton);

    // Check if the slider navigates to the next slide
    // (You may need to adjust this based on how your slider handles navigation)
    const activeSlide = screen.getByRole("img", { name: /active slide/i });
    expect(activeSlide).toBeInTheDocument();
  });

  test("navigates to the previous slide when the previous button is clicked", () => {
    render(<Slider />);

    // Check if the previous button is rendered
    const prevButton = screen.getByRole("button", { name: /previous/i });
    expect(prevButton).toBeInTheDocument();

    // Simulate clicking the previous button
    fireEvent.click(prevButton);

    // Check if the slider navigates to the previous slide
    // (You may need to adjust this based on how your slider handles navigation)
    const activeSlide = screen.getByRole("img", { name: /active slide/i });
    expect(activeSlide).toBeInTheDocument();
  });

  test("renders navigation dots if applicable", () => {
    render(<Slider />);

    // Check if navigation dots are rendered
    const dots = screen.getAllByRole("button", { name: /navigation dot/i });
    expect(dots.length).toBeGreaterThan(0); // Ensure at least one dot is present
  });
});