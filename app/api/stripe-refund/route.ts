import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { sendMail } from "../../libs/mailService";

export async function POST(request: Request) {
  try {
    const { data, type } = await request.json();
    // return NextResponse.json({ message: "Success!", type, data });
    if (type === "refund.created" || type === "refund.updated" || type === "charge.refunded") {
      // Change status from peding to success
      await prisma.reservation.updateMany({
        where: {
          paymentId: data.object.payment_intent,
        },
        data: {
          status: "refund",
        },
      });

      const reservation = await prisma.reservation.findFirst({
        where: {
          paymentId: data.object.payment_intent,
        },
      });

      const infoRomm = await prisma.accommodation.findFirst({
        where: {
          id: reservation?.accommodationId,
        },
        select: {
          title: true,
          image: true,
        },
      });

      // fetch('/path/to/emailTemplate.ejs') // Điều chỉnh đường dẫn tùy theo vị trí của file template
      // .then(response => response.text())
      // .then(template => {
      //   const compiledTemplate = ejs.compile(template);
      // const htmlToSend = compiledTemplate({ username: 'John' }); // Thay 'John' bằng tên người nhận
      // sendEmail(htmlToSend);
      // })
      // .catch(error => console.error('Error fetching template:', error));

      await sendMail(
        "Refunded Successfully",
        reservation?.email as string,
        reservation?.name as string,
        {
          name: infoRomm?.title as string,
          image: infoRomm?.image as string,
          startDate: reservation?.startDate as Date,
          endDate: reservation?.endDate as Date,
        }
      );
    }

    return NextResponse.json({ message: "Success!", type, data });
  } catch (err: any) {
    return NextResponse.json({ message: err.message });
  }
}
