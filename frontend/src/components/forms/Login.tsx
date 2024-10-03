"use client";

import { useState } from "react";
import axios from "@/utils/axios";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/slices/tokenSlice";
import { useRouter } from "next/navigation";
import { addUser } from "@/redux/slices/userSlice";
import Link from "next/link";

type Logininfo = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const dispatch = useDispatch();
  const [info, setInfo] = useState<Logininfo>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post("/users/login/", info);
      const { access_token, user } = data;
      dispatch(setToken(access_token));
      dispatch(addUser(user));
      router.push("/home");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col mt-[1rem]">
      <label htmlFor="email" className="">
        email
      </label>
      <input
        type="text"
        onChange={(e) => setInfo({ ...info, [e.target.name]: e.target.value })}
        value={info.email}
        className="border-[#FCCB2A] border focus:outline-none rounded-md p-[0.5rem]"
        name="email"
        placeholder="email"
      />
      <label htmlFor="password" className="mt-[1rem]">
        Password
      </label>
      <input
        type="password"
        onChange={(e) => setInfo({ ...info, [e.target.name]: e.target.value })}
        value={info.password}
        className="border-[#FCCB2A] border focus:outline-none rounded-md p-[0.5rem]"
        name="password"
        placeholder="password"
      />
      <button
        className="mt-[1rem] p-[0.3rem] rounded-md"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,207,0,1) 0%, rgba(252,169,3,1) 100%)",
        }}
        disabled={loading}
      >
        <span
          className="p-[0.5rem] flex justify-center items-center rounded-md font-semibold text-xl text-[#efebe1]"
          style={{
            background:
              "linear-gradient(180deg, rgba(252,169,3,1) 0%, rgba(255,207,0,1) 100%)",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </span>
      </button>
      <Link href={"/register"} className="mt-[1rem] text-center">
        Don&apos;t have an account?{" "}
        <span className="text-[#FCCB2A]">Sign up here</span>
      </Link>
    </form>
  );
}
