import { RampartClient } from "@rampartcorporation/sdk";

// Create a singleton instance of the Rampart client
export const getRampartClient = () => {
  return new RampartClient({
    secret: process.env.RAMPART_SECRET,
    partnerId: process.env.RAMPART_PARTNER_ID,
    environment: process.env.ENVIRONMENT,
  });
}; 