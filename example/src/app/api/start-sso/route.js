import { NextResponse } from "next/server";
import { getRampartClient } from "../../../utils/rampartClient";

export async function POST(request) {
  try {
    const { userData, businessData } = await request.json();

    // Get the shared Rampart client instance
    const rampartClient = getRampartClient();

    // Prepare the payload for Rampart
    const rampartPayload = {
      user: userData,
      business: businessData,
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
