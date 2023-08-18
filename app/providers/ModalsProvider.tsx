"use client";

import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import SearchModal from "../components/modals/SearchModal";

const ModalsProvider = () => {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <SearchModal />
    </>
  );
};

export default ModalsProvider;
