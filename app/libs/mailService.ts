import nodemailer from "nodemailer";
// import ejs from "ejs";

export async function sendMail(
  subject: string,
  toEmail: string,
  name: string,
  // htmlToSend: any
  info: {
    name: string;
    image: string;
    startDate: Date;
    endDate: Date;
  }
): Promise<boolean> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  const startDate = info.startDate;
  const endDate = info.endDate;
  const historyLink = "https://travelnest.space/host";

  const formattedStartDate = startDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedEndDate = endDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: toEmail,
    subject: subject,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Booking Successful</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f8f8f8; margin: 0; padding: 0;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #fff; border-radius: 10px; margin: 20px auto; padding: 20px; box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);">
              <tr>
                  <td align="center" style="padding: 20px;">
                      <img src="https://res.cloudinary.com/dqrm0sqsu/image/upload/v1691938685/logo_xnm5mt.png" alt="TravelNest Logo" style="max-width: 200px;">
                      <h1 style="color: #e74c3c;">Booking Successful!</h1>
                      <p>Hello <strong>${name}</strong>,</p>
                      <p>Thank you for booking with TravelNest. Your booking details are as follows:</p>
                      <div style="justify-content: center; padding-top: 10px; padding-bottom: 10px">
                          <p><strong>Hotel:</strong> ${info.name}</p>
                          <p><strong>Check-in Date:</strong> ${formattedStartDate}</p>
                          <p><strong>Check-out Date:</strong> ${formattedEndDate}</p>
                      </div>
                      <img src="${info.image}" alt="Room Illustration" style="max-width: 400px; margin-top: 20px;">
                      <p>You can view the details of your booking by visiting the <a href="${historyLink}" style="color: #e74c3c;">booking history page</a>.</p>
                  </td>
              </tr>
          </table>
      </body>
      </html>
    `,
  };

  try {
    transporter.sendMail(mailOptions);
    console.log("Email Sent");
    return true;
  } catch (error: unknown) {
    console.log("Error: ");
    throw new Error(error as string);
  }
}
