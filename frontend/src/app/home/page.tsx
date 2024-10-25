// TODO: Make this server component

"use client"
import React from 'react'
import { useAppSelector } from '@/utils/reduxHooks';
import useLogout from '@/hooks/useLogout';
import useAxiosInt from '@/hooks/useAxiosInt';

export default function Page() {
  const logout = useLogout();
  const axios = useAxiosInt();
  
  async function test() {
    try {
      const res = await axios.get("/users/");
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const { user } = useAppSelector((state) => state.user);

  return (
    <main>
      <h1>WELCOME BACK {user?.name}!!!</h1>
      <button onClick={() => test()} className="border rounded-md px-[1rem]">
        hello
      </button>
      <button onClick={() => logout()} className="border rounded-md px-[1rem]">
        logout
      </button>
    </main>
  );
}
