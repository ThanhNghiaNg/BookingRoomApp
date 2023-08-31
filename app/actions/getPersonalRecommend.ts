'use server'

import prisma from '@/app/libs/prismadb'
import { SafeReservation } from '../types'

interface IParams {
  userId?: string
}

export default async function getPersonalRecommend(params: IParams) {
  try {
    const { userId } = params

    const reservations = await prisma.personalRecommend.findFirst({
      where: {
        userId: userId,
      },
    })

    return reservations

    // return safeReservations
  } catch (error: any) {
    // throw new Error(error);
    console.log(error)
  }
}
