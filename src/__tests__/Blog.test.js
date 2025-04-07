import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Blog from "../Components/Pages/Blog";
import { BrowserRouter } from "react-router-dom"; // Required for Layout component

describe("Blog Component", () => {
  test("renders the Blog component correctly", () => {
    render(
      <BrowserRouter>
        <Blog />
      </BrowserRouter>
    );

    // Check if the main heading is rendered
    expect(screen.getByText("Articles")).toBeInTheDocument();

    // Check if the blog posts are rendered
    expect(screen.getByText("Smart WiFi Drip Controller")).toBeInTheDocument();
    expect(
      screen.getByText(
        "A revolutionary system that automates plant irrigation using IoT, optimizing water usage while ensuring plant health."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText("Water-Efficient Solutions for Every Space")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Our devices cater to gardens of all sizes, offering solutions like water tank-based systems for balconies and waterproof models for outdoor use."
      )
    ).toBeInTheDocument();

    // Check if the images are rendered
    const firstImage = screen.getByAltText("Smart WiFi Drip Controller");
    expect(firstImage).toBeInTheDocument();
    expect(firstImage).toHaveAttribute(
      "src",
      "https://www.gogreendrip.com/GoGreen/GoGreen/images/adviti1.jpg"
    );

    const secondImage = screen.getByAltText("Water-Efficient Solutions for Every Space");
    expect(secondImage).toBeInTheDocument();
    expect(secondImage).toHaveAttribute(
      "src",
      "https://www.gogreendrip.com/GoGreen/GoGreen/images/adviti2.jpg"
    );
  });

  test("toggles the 'Learn more' and 'Show less' functionality", () => {
    render(
      <BrowserRouter>
        <Blog />
      </BrowserRouter>
    );

    // Find the "Learn more" button for the first blog post
    const learnMoreButton = screen.getByText("Learn more", { exact: false });
    expect(learnMoreButton).toBeInTheDocument();

    // Click the "Learn more" button
    fireEvent.click(learnMoreButton);

    // Check if the full content is displayed
    expect(
      screen.getByText(
        "The Smart WiFi Drip Controller provides automated irrigation management via a mobile app. It ensures plants receive optimal water, reducing waste and enhancing efficiency. Ideal for small gardens and large farms alike."
      )
    ).toBeInTheDocument();

    // Check if the button text changes to "Show less"
    expect(screen.getByText("Show less", { exact: false })).toBeInTheDocument();

    // Click the "Show less" button
    fireEvent.click(screen.getByText("Show less", { exact: false }));

    // Check if the full content is hidden again
    expect(
      screen.queryByText(
        "The Smart WiFi Drip Controller provides automated irrigation management via a mobile app. It ensures plants receive optimal water, reducing waste and enhancing efficiency. Ideal for small gardens and large farms alike."
      )
    ).not.toBeInTheDocument();
  });

  test("renders the YouTube video", () => {
    render(
      <BrowserRouter>
        <Blog />
      </BrowserRouter>
    );

    // Check if the YouTube iframe is rendered
    const iframe = screen.getByTitle("YouTube video player");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/VLSPHFUg3pU?si=szxPQ37LrcsRN2os"
    );
  });
});