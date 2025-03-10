require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { RampartClient } = require("@rampartcorporation/sdk");

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Rampart Client
const rampartClient = new RampartClient({
  secret: process.env.RAMPART_SECRET, // Load your secret from .env
  environment: "development",
});

// SSO Endpoint
app.get("/start-sso", async (req, res) => {
  try {
    // You would get this from your database
    const rampartPayload = {
      iss: "a1e01b75-d66c-4234-90c3-2e8b9941b7da", // Your partner ID
      user: {
        id: "1234567890", // ID you associate with this user
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "+1234567890", // Optional
      },
      business: {
        id: "1234567890", // ID you associate with the business
        name: "Acme, Inc.",
        addressLine1: "123 Main St",
        addressLine2: "4th Floor", // Optional
        city: "San Francisco",
        state: "CA",
        zip: "94101",
        country: "USA",
        email: "contact@acme.com",
        phone: "+1234567890", // Optional
      },
    };

    // Generate the Rampart URL
    const response = await rampartClient.generateRampartLink(rampartPayload);

    const rampartUrl = response.data.link;

    console.log("Rampart URL:", rampartUrl);

    // Redirect to the Rampart URL
    res.json({ rampartUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "SSO generation failed" });
  }
});

// Start Server
app.listen(3001, () => console.log(`Backend running on http://localhost:3001`));
