const handleBooking = async () => {
  try {
    const bookingDetails = "Your booking details go here";

    const response = await fetch("/api/push-mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipientEmail: "ibuhuy105@gmail.com", // Replace with the recipient's email
        bookingDetails,
      }),
    });

    if (response.ok) {
      console.log("Email sent successfully!");
      // Additional success handling logic, e.g., showing a success message to the user
    } else {
      console.error("Failed to send email");
      // Additional error handling logic, e.g., showing an error message to the user
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default handleBooking;
