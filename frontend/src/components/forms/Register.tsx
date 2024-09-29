"use client";

import React, { useState } from "react";
import axios from "@/utils/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/slices/tokenSlice";
import { addUser } from "@/redux/slices/userSlice";

type Registerinfo = {
  email: string;
  password: string;
  name: string;
};

export default function Register() {
  const [info, setinfo] = useState<Registerinfo>({
    email: "",
    password: "",
    name: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    try {
      setLoading(true);
      e.preventDefault();
      const { data } = await axios.post("/users/register/", info);

      dispatch(setToken(data.access_token));
      dispatch(addUser(data.user));

      router.push("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col mt-[1rem]">
      <label htmlFor="name" className="">
        Name
      </label>
      <input
        type="text"
        onChange={(e) => setinfo({ ...info, [e.target.name]: e.target.value })}
        value={info.name}
        className="border-[#FCCB2A] border focus:outline-none rounded-md p-[0.5rem]"
        name="name"
        placeholder="Name"
      />
      <label htmlFor="email" className="mt-[1rem]">
        Email
      </label>
      <input
        type="email"
        onChange={(e) => setinfo({ ...info, [e.target.name]: e.target.value })}
        value={info.email}
        className="border-[#FCCB2A] border focus:outline-none rounded-md p-[0.5rem]"
        name="email"
        placeholder="Email"
      />
      <label htmlFor="password" className="mt-[1rem]">
        Password
      </label>
      <input
        type="password"
        onChange={(e) => setinfo({ ...info, [e.target.name]: e.target.value })}
        value={info.password}
        className="border-[#FCCB2A] border focus:outline-none rounded-md p-[0.5rem]"
        name="password"
        placeholder="Password"
      />
      <button
        className="mt-[1rem] p-[0.3rem] rounded-md"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,207,0,1) 0%, rgba(252,169,3,1) 100%)",
        }}
        aria-disabled={loading}
      >
        <span
          className="p-[0.5rem] flex justify-center items-center rounded-md font-semibold text-xl text-[#efebe1]"
          style={{
            background:
              "linear-gradient(180deg, rgba(252,169,3,1) 0%, rgba(255,207,0,1) 100%)",
          }}
        >
          {loading ? "Making account..." : "Sign up"}
        </span>
      </button>
      <Link href={"/login"} className="mt-[1rem] text-center">
        Already have an account?{" "}
        <span className="text-[#FCCB2A]">Login in here</span>
      </Link>
    </form>
  );
}
