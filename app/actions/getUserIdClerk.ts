"use server";
import { auth } from "@clerk/nextjs";
export async function getUserIdClerk() {
  const userid = auth().userId;
  return userid;
}
