"use client";

import React from "react";
import { usePathname } from "next/navigation";
import FloatingButton from "./FloatingButton";
import { useRouter } from "next/router";

const ChatAI: React.FC = () => {
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  return (
    <div>
      {isHomePage && (
        <div className="fixed bottom-4 right-4 z-40">
          <FloatingButton />
        </div>
      )}
    </div>
  );
};

export default ChatAI;
