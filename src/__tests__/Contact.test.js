import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Contact from "../Components/Pages/Contact";

describe("Contact Component", () => {
  test("renders the Contact component correctly", () => {
    render(<Contact />);

    // Check if the main heading is rendered
    expect(screen.getByText("Contact Us")).toBeInTheDocument();

    // Check if the form fields are rendered
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();

    // Check if the submit button is rendered
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
  });

  test("allows the user to fill out the form", () => {
    render(<Contact />);

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "johndoe@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "This is a test message." },
    });

    // Check if the form fields have the correct values
    expect(screen.getByLabelText("Name")).toHaveValue("John Doe");
    expect(screen.getByLabelText("Email")).toHaveValue("johndoe@example.com");
    expect(screen.getByLabelText("Message")).toHaveValue("This is a test message.");
  });

  test("submits the form when the submit button is clicked", () => {
    const mockSubmit = jest.fn();
    render(<Contact onSubmit={mockSubmit} />);

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "johndoe@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "This is a test message." },
    });

    // Click the submit button
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    // Check if the form submission handler was called
    expect(mockSubmit).toHaveBeenCalled();
  });
});