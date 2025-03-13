'use client';

import { useState, useEffect } from 'react';
import RampartSSOFlow from '../../components/RampartSSOFlow';

export default function VerifyPage() {
  // In a real application, you would get this data from your backend/database
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

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Business Verification</h1>
      <RampartSSOFlow userData={userData} businessData={businessData} />
    </div>
  );
} 