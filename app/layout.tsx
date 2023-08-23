import { Nunito } from "next/font/google";

import Navbar from "@/app/components/navbar/Navbar";
import SearchModal from "@/app/components/modals/SearchModal";
import ToasterProvider from "@/app/providers/ToasterProvider";

import "./globals.css";
import ClientOnly from "./components/ClientOnly";
import getCurrentUser from "./actions/getCurrentUser";
import ConfirmModal from "./components/modals/ConfirmModal";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "./components/Footer";
import Image from "next/image";

import PlaneAnimation from "../public/gifs/paper-airplan.gif";
import RemoveLoader from "./components/removeLoader";
import ScreenCheck from "./components/ScreenCheck";
import ChatAI from "./components/floatButton/ChatAI";
import ChatRecommendModal from "./components/floatButton/ModalRecommend";

export const metadata = {
  title: "Travel Nest",
  description: "Công nghệ thông tin 2",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className} suppressHydrationWarning={true}>
          <div
            id="loader"
            className="h-[100vh] overflow-hidden flex flex-col justify-center items-center fixed w-full left-0 top-0 right-0 z-50 bg-white"
          >
            <Image
              src={PlaneAnimation}
              alt="Plane Gif"
              className="text-center w-[150px] h-[150px]"
            />
          </div>
          <ClientOnly>
            <ToasterProvider />
            <SearchModal />
            <ConfirmModal />
            <RemoveLoader />
            <ScreenCheck />
            <ChatRecommendModal />
          </ClientOnly>
          <ClientOnly>
            <ChatAI />
          </ClientOnly>
          <Navbar />
          <div className="pb-20 pt-28 min-h-screen">{children}</div>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
