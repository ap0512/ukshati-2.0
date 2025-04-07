import React from "react";
import { render, screen } from "@testing-library/react";
import Appinfo from "../Components/Pages/Appinfo";

describe("Appinfo Component", () => {
  test("renders the Appinfo component correctly", () => {
    render(<Appinfo />);

    // Check if the app image is rendered
    const appImage = screen.getByAltText("App");
    expect(appImage).toBeInTheDocument();
    expect(appImage).toHaveAttribute("src", "./New_Images/appgg.png");

    // Check if the QR code is rendered
    const qrCode = screen.getByAltText("QR Code");
    expect(qrCode).toBeInTheDocument();
    expect(qrCode).toHaveAttribute("src", "./New_Images/qr.png");

    // Check if the main heading is rendered
    expect(
      screen.getByText("Grow Smarter: Automate Your Irrigation with Ukshati")
    ).toBeInTheDocument();

    // Check if the subheading is rendered
    expect(screen.getByText("Scan to Download Now!")).toBeInTheDocument();

    // Check if the App Store button is rendered
    const appStoreButton = screen.getByText("Download From App Store");
    expect(appStoreButton).toBeInTheDocument();

    // Check if the Google Play Store button is rendered
    const googlePlayButton = screen.getByText(
      "Download From Google Play Store"
    );
    expect(googlePlayButton).toBeInTheDocument();
  });

  test("renders the download buttons with correct icons", () => {
    render(<Appinfo />);

    // Check if the App Store button icon is rendered
    const appStoreIcon = screen.getByAltText("App Store");
    expect(appStoreIcon).toBeInTheDocument();
    expect(appStoreIcon).toHaveAttribute("src", "./New_Images/app-store.png");

    // Check if the Google Play Store button icon is rendered
    const googlePlayIcon = screen.getByAltText("Google Play Store");
    expect(googlePlayIcon).toBeInTheDocument();
    expect(googlePlayIcon).toHaveAttribute(
      "src",
      "./New_Images/google-play.png"
    );
  });
});