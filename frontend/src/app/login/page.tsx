import React from "react";
import LoginForm from "@/components/forms/Login";
import Background from "@/components/common/Background";

export default function Page() {
  return (
    <Background>
      <div className="flex h-screen w-screen px-[4rem]">
        <div className="w-[70%]">hi</div>
        <LoginForm />
      </div>
    </Background>
  );
}
