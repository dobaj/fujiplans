"use client"
import React from 'react'
import { useAppSelector } from '@/utils/reduxHooks';
import useCustomFetch from '@/hooks/useCustomFetch';
import useLogout from '@/hooks/useLogout';

export default function Home() {
  const customFetch = useCustomFetch()
  const logout = useLogout();
  
  async function test() {
    try {
      const res = await customFetch("/users", "get");
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
