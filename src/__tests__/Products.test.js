import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Products from "../Components/Pages/Products";
import SystemCards from "../Components/Layouts/SystemCards";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../Components/Layouts/SystemCards", () => {
  return jest.fn(() => <div data-testid="system-cards">SystemCards Component</div>);
});

describe("Products Component", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(mockNavigate);
  });

  test("renders the Products component correctly", () => {
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    // Check if the SystemCards component is rendered
    expect(screen.getByTestId("system-cards")).toBeInTheDocument();
  });

  test("redirects to login if the user is not authenticated", () => {
    // Mock localStorage to simulate an unauthenticated user
    jest.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
      if (key === "isAuthenticated") return null;
      return null;
    });

    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    // Check if navigate was called with "/login"
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("does not redirect if the user is authenticated", () => {
    // Mock localStorage to simulate an authenticated user
    jest.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
      if (key === "isAuthenticated") return "true";
      return null;
    });

    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    // Check if navigate was not called
    expect(mockNavigate).not.toHaveBeenCalled();

    // Check if the SystemCards component is rendered
    expect(screen.getByTestId("system-cards")).toBeInTheDocument();
  });
});