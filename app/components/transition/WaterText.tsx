import React from "react";
import "./WaterText.css";

export default function WaterText() {
  return (
    <div className="flex items-center justify-center min-h-[100vh] bg-dark">
      <div className="relative loader">
        <h1 className="loader_text1 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[10em] font-extrabold text-light">
          Travel&nbsp;Nest
        </h1>
        <h1 className="loader_text2 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[10em] font-extrabold text-light">
          Travel&nbsp;Nest
        </h1>
      </div>
    </div>
  );
}
