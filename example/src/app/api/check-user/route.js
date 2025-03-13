import { NextResponse } from "next/server";
import { getRampartClient } from "../../../utils/rampartClient";

export async function POST(request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Get the shared Rampart client instance
    const rampartClient = getRampartClient();

    // Check if user exists in Rampart system
    const exists = await rampartClient.checkUserExists(userId);

    return NextResponse.json({
      exists: exists,
    });
  } catch (err) {
    console.error("Error checking user existence:", err);
    return NextResponse.json(
      { error: "Failed to check user existence" },
      { status: 500 }
    );
  }
}
