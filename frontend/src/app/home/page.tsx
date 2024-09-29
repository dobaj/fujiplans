"use client"
import React from 'react'
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Page() {
  const { token } = useSelector((state: RootState) => state.token);
  const { user } = useSelector((state: RootState) => state.user);
  console.log(user)
  console.log(token)
  return (<main>
    <h1>WELCOME BACK {user?.name}!!!</h1>
  </main>)
}
