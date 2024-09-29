import React from "react";
import LoginForm from "@/components/forms/Login";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";

export default function Page() {
  //example of how to use useSelector with ts (state is unknown type fix)
  // const { token } = useSelector((state: RootState) => state.token);

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="w-[300px]">
        <LoginForm />
      </div>
    </main>
  );
}
