import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Auth from "../Components/Pages/Login";
import axios from "axios";

jest.mock("axios");

describe("Auth Component (Login/Signup)", () => {
  test("renders the Login component correctly", () => {
    render(
      <BrowserRouter>
        <Auth />
      </BrowserRouter>
    );

    // Check if the login heading is rendered
    expect(screen.getByText("Welcome Back")).toBeInTheDocument();

    // Check if the email and password fields are rendered
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument();

    // Check if the login button is rendered
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  test("allows the user to fill out the login form", () => {
    render(
      <BrowserRouter>
        <Auth />
      </BrowserRouter>
    );

    // Fill out the form fields
    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "johndoe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "password123" },
    });

    // Check if the form fields have the correct values
    expect(screen.getByPlaceholderText("Enter your email")).toHaveValue("johndoe@example.com");
    expect(screen.getByPlaceholderText("Enter your password")).toHaveValue("password123");
  });

  test("handles login submission correctly", async () => {
    axios.post.mockResolvedValueOnce({
      data: { token: "mockToken" },
    });

    render(
      <BrowserRouter>
        <Auth />
      </BrowserRouter>
    );

    // Fill out the form fields
    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "johndoe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "password123" },
    });

    // Click the login button
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    // Check if axios.post was called with the correct arguments
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3001/login",
      {},
      {
        auth: { username: "johndoe@example.com", password: "password123" },
      }
    );
  });

  test("toggles between login and signup forms", () => {
    render(
      <BrowserRouter>
        <Auth />
      </BrowserRouter>
    );

    // Check if the login heading is rendered initially
    expect(screen.getByText("Welcome Back")).toBeInTheDocument();

    // Click the "Create an Account" button
    fireEvent.click(screen.getByText("Create an Account"));

    // Check if the signup heading is rendered
    expect(screen.getByText("Create an Account")).toBeInTheDocument();

    // Check if the name field is rendered in the signup form
    expect(screen.getByPlaceholderText("Full Name")).toBeInTheDocument();
  });

  test("handles Google OAuth login", () => {
    delete window.location;
    window.location = { href: "" };

    render(
      <BrowserRouter>
        <Auth />
      </BrowserRouter>
    );

    // Click the Google login button
    fireEvent.click(screen.getByText(/Continue with Google/i));

    // Check if the window location is updated
    expect(window.location.href).toBe("http://localhost:3001/auth/google");
  });
});