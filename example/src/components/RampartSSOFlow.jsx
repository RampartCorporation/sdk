import { useState, useEffect } from 'react';

export default function RampartSSOFlow({ userData, businessData }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userExists, setUserExists] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [rampartUrl, setRampartUrl] = useState(null);

  useEffect(() => {
    const checkUserExistence = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/check-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            userId: userData.id 
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to check user existence');
        }

        const data = await response.json();
        setUserExists(data.exists);
        
        // If user already exists, proceed to generate SSO link
        if (data.exists) {
          await generateSSOLink();
        }
        
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to check if user exists');
        setLoading(false);
      }
    };

    if (userData?.id) {
      checkUserExistence();
    }
  }, [userData]);

  const generateSSOLink = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/start-sso');
      
      if (!response.ok) {
        throw new Error('Failed to generate SSO link');
      }
      
      const data = await response.json();
      setRampartUrl(data.rampartUrl);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to generate SSO link');
      setLoading(false);
    }
  };

  const handleConsent = async () => {
    setConsentGiven(true);
    await generateSSOLink();
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  if (!userExists && !consentGiven) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Data Sharing Consent</h2>
        <p className="mb-4">
          We need your permission to share your information with Rampart for verification purposes.
          This includes your personal and business information.
        </p>
        
        <div className="bg-gray-50 p-4 rounded mb-4">
          <h3 className="font-medium mb-2">Information we'll share:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Name: {userData.firstName} {userData.lastName}</li>
            <li>Email: {userData.email}</li>
            <li>Business Name: {businessData.name}</li>
            <li>Business Address: {businessData.addressLine1}, {businessData.city}, {businessData.state}</li>
          </ul>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button 
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleConsent}
          >
            I Consent
          </button>
        </div>
      </div>
    );
  }

  if (rampartUrl) {
    // Redirect to Rampart SSO URL
    window.location.href = rampartUrl;
    return <div className="text-center p-4">Redirecting to verification service...</div>;
  }

  return <div className="text-center p-4">Processing your request...</div>;
} 