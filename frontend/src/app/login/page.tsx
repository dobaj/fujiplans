import React from "react";
import LoginForm from "@/components/forms/Login";
//import Background from "@/components/common/Background";

export default function Page() {
  return (
    <main className="h-screen w-screen bg-background">
      <div className="flex h-screen w-screen px-[4rem]">
        <div className="w-[70%]"/>
        <LoginForm />
      </div>
    </main>
  );
}
