"use client";

import isUserLoginModal from "@/app/hooks/useIsLogin";
import { SafeUser } from "@/app/types";
import { useEffect } from "react";

const ListenerLogin = ({ currentUser }: { currentUser: SafeUser | null }) => {
  const { isLogin, onLoginSuccess, onLogoutSuccess } = isUserLoginModal();
  useEffect(() => {
    if (!!currentUser) {
      onLoginSuccess();
      return;
    }
    onLogoutSuccess();
  }, [currentUser]);
  return <></>;
};

export default ListenerLogin;
