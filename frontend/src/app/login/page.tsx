import React from "react";
import LoginForm from "@/components/forms/Login";

export default function Page() {

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="w-[300px]">
        <LoginForm />
      </div>
    </main>
  );
}
