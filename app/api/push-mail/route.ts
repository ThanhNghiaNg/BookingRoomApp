import nodemailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).end(); // Method Not Allowed
//   }

//   const { recipientEmail, bookingDetails } = req.body;

//   try {
//     // Replace the following with your actual email service provider settings
//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: "quanghuy1052000@gmail.com",
//         pass: "bzlvpifnfgiqdswf",
//       },
//     });

//     const mailOptions = {
//       from: "quanghuy1052000@gmail.com",
//       to: recipientEmail,
//       subject: "Booking Success",
//       text: `Your booking was successful. Here are the details:\n\n${bookingDetails}`,
//     };

//     await transporter.sendMail(mailOptions);

//     return res.status(200).json({ message: "Email sent successfully!" });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return res.status(500).json({ message: "Failed to send email" });
//   }
// }

interface IParams {
  mail: string;
  mess: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "quanghuy1052000@gmail.com",
      pass: "bzlvpifnfgiqdswf",
    },
  });

  const mailOptions = {
    from: "quanghuy1052000@gmail.com",
    to: params.mail,
    subject: "Booking Success",
    text: `Your booking was successful. Here are the details:\n\n${params.mess}`,
  };

  const res = await transporter.sendMail(mailOptions);

  return NextResponse.json(res);
}
