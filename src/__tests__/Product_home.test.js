import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; // Required for useNavigate
import Product_home from "../Components/Layouts/Product_home";
import { productDetails } from "../Components/Utils/Data";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Product_home Component", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(mockNavigate);
  });

  test("renders the Product_home component correctly", () => {
    render(
      <BrowserRouter>
        <Product_home />
      </BrowserRouter>
    );

    // Check if the main heading is rendered
    expect(screen.getByText("Our Products")).toBeInTheDocument();

    // Check if all product cards are rendered
    productDetails.forEach((product) => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
      expect(screen.getByText(product.description)).toBeInTheDocument();
    });
  });

  test("renders lazy-loaded images with placeholders", () => {
    render(
      <BrowserRouter>
        <Product_home />
      </BrowserRouter>
    );

    // Check if placeholder images are rendered initially
    const placeholders = screen.getAllByRole("img", { name: /placeholder/i });
    expect(placeholders.length).toBe(productDetails.length);

    // Check if product images are rendered with correct alt text
    productDetails.forEach((product) => {
      const productImage = screen.getByAltText(product.title);
      expect(productImage).toBeInTheDocument();
      expect(productImage).toHaveAttribute("src", product.img);
    });
  });

  test("navigates to login page when a product card is clicked", () => {
    render(
      <BrowserRouter>
        <Product_home />
      </BrowserRouter>
    );

    // Simulate clicking on the first product card
    const firstProductCard = screen.getByText(productDetails[0].title);
    fireEvent.click(firstProductCard);

    // Check if navigate was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("renders shimmer effect for loading state", () => {
    render(
      <BrowserRouter>
        <Product_home />
      </BrowserRouter>
    );

    // Check if shimmer effect is rendered
    const shimmerElements = screen.getAllByText((content, element) =>
      element.className.includes("animate-pulse")
    );
    expect(shimmerElements.length).toBeGreaterThan(0);
  });
});