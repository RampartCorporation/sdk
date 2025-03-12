"use client";

import { useState } from "react";
import axios from "axios";
import "./globals.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSso = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/start-sso");
      window.location.href = response.data.rampartUrl; // Redirect to Rampart to complete the SSO process
    } catch (error) {
      console.error("SSO Error:", error);
      alert("Failed to start SSO");
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Rampart SSO Example</h1>
      <button onClick={handleSso} disabled={isLoading} className="sso-button">
        {isLoading ? "Loading..." : "Rampart SSO"}
      </button>
    </div>
  );
}
