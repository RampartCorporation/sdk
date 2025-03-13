"use client";

import { useState } from "react";
import axios from "axios";
import "./globals.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showConsent, setShowConsent] = useState(false);

  // Sample user and business data - in a real app you would get this from your database
  const userData = {
    id: "1234567890",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1234567890",
  };

  const businessData = {
    id: "1234567890",
    name: "Acme, Inc.",
    addressLine1: "123 Main St",
    addressLine2: "4th Floor",
    city: "San Francisco",
    state: "CA",
    zip: "94101",
    country: "USA",
    email: "contact@acme.com",
    phone: "+1234567890",
  };

  const checkUserExists = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/check-user", {
        userId: userData.id,
      });

      // If user exists, proceed directly to SSO
      // Otherwise, show the consent form
      if (response.data.exists) {
        startSso();
      } else {
        setShowConsent(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error checking user:", error);
      setErrorMessage("Failed to check if user exists");
      setIsLoading(false);
    }
  };

  const startSso = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/start-sso", {
        userData,
        businessData,
      });
      window.location.href = response.data.rampartUrl; // Redirect to Rampart
    } catch (error) {
      console.error("SSO Error:", error);
      setErrorMessage("Failed to start SSO process");
      setIsLoading(false);
    }
  };

  const handleConsent = () => {
    setShowConsent(false);
    startSso();
  };

  return (
    <div className="container">
      <h1>Rampart SSO Example</h1>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {!isLoading && !showConsent && (
        <div className="button-container">
          <button onClick={checkUserExists} className="start-button">
            Start Verification
          </button>
        </div>
      )}

      {isLoading && !showConsent && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Processing...</p>
        </div>
      )}

      {showConsent && (
        <div className="consent-modal">
          <h2>Data Sharing Consent</h2>
          <p>
            We need your permission to share your information with Rampart for
            verification purposes. This includes your personal and business
            information.
          </p>

          <div className="info-box">
            <h3>Information we&apos;ll share:</h3>
            <ul>
              <li>Personal Information</li>
              <li>Business Details</li>
              <li>Business Contact Information</li>
            </ul>
          </div>

          <div className="consent-buttons">
            <button
              className="cancel-button"
              onClick={() => setShowConsent(false)}
            >
              Cancel
            </button>

            <button className="consent-button" onClick={handleConsent}>
              I Consent
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
