import { NextResponse } from "next/server";
import { RampartClient } from "@rampartcorporation/sdk";

// Initialize Rampart Client
const rampartClient = new RampartClient({
  secret: process.env.RAMPART_SECRET, // Your secret key
  environment: process.env.ENVIRONMENT,
});

export async function GET() {
  try {
    console.log("RAMPART_SECRET", process.env.RAMPART_PARTNER_ID);
    // You would get this from your database
    const rampartPayload = {
      iss: process.env.RAMPART_PARTNER_ID, // Your partner ID
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

    console.log("Rampart Redirect URL:", rampartUrl);

    // Return the Rampart URL as JSON
    return NextResponse.json({ rampartUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "SSO generation failed" },
      { status: 500 }
    );
  }
}
