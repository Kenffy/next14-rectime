import React from "react";
import CustomAvatar from "./CustomAvatar";

export default function Navbar() {
  return (
    <div className=" w-full h-[70px] border-b flex justify-center">
      <div className=" w-full px-[2rem] mx-auto flex items-center justify-between">
        <div className=" text-2xl">Logo</div>
        <div>Links</div>
        <div>
          <CustomAvatar />
        </div>
      </div>
    </div>
  );
}
