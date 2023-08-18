export const generateVerificationLink = (token: string): string => {
    const baseUrl = 'http://localhost:3000/'; // Replace with your base URL
  
    // Construct the verification link using the base URL and the token
    const verificationLink = `${baseUrl}/verify/${token}`;
  
    return verificationLink;
  };
  