"use client";

import { useState } from "react";
import axios from "@/utils/axios";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/slices/tokenSlice";
import { useRouter } from "next/navigation";
import { addUser } from "@/redux/slices/userSlice";
import Link from "next/link";
import { openGooglePopup } from "@/utils/openGooglePopup";
import useGoogleLogin from "@/hooks/useGoogleLogin";
import Input from "../common/Input";
import Image from "next/image";

type LoginInfo = {
  Email: string;
  Password: string;
};

export default function LoginForm() {
  const dispatch = useDispatch();
  const [info, setInfo] = useState<LoginInfo>({
    Email: "",
    Password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useGoogleLogin();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post("/users/login/", info);
      const { access_token, user } = data;
      dispatch(setToken(access_token));
      dispatch(addUser(user));
      router.push("/home/prompt");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col w-[30%] justify-center">
      <h2 className="text-[#7C8A5C] font-semibold text-4xl mb-[1rem]">
        Sign in
      </h2>
      <Input
        labelName="Email"
        onChange={(e) => setInfo({ ...info, [e.target.name]: e.target.value })}
        value={info.Email}
        type="text"
      />
      <Input
        labelName="Password"
        onChange={(e) => setInfo({ ...info, [e.target.name]: e.target.value })}
        value={info.Password}
        type="Password"
      />
      <div className="flex items-center justify-between my-[0.5rem]">
        <div className="flex items-center gap-[0.5rem]">
          <input type="checkbox" />
          <p>Remember me</p>
        </div>
        <Link
          href={"/forgot-password"}
          className="bg-gradient-to-r from-[#424C2B] via-[#9AB164] via-[#9AB164] to-[#7C8A5C] text-transparent bg-clip-text"
        >
          Forgot password?
        </Link>
      </div>
      <div className="flex flex-col gap-[1rem]">
        <button
          className="bg-gradient-to-r from-[#9AB164] to-[#DFFF94] p-[0.5rem] rounded-[1rem] h-[4rem] w-full"
          aria-disabled={loading}
        >
          {loading ? (
            "Signing in..."
          ) : (
            <span className="text-[#717568] font-bold text-lg">Sign in</span>
          )}
        </button>
        <hr />
        <button
          onClick={() => openGooglePopup()}
          type="button"
          className="p-[0.5rem] rounded-[1rem] h-[4rem] border-1 border flex justify-center items-center gap-[1rem]"
        >
          <Image
            src="/logos/googleIcon.svg"
            height={40}
            width={40}
            alt="Google"
          />
          Login with Google
        </button>
      </div>
      <Link href={"/register"} className="mt-[1rem] text-center">
        Don&apos;t have an account?{" "}
        <span className="text-[#7C8A5C]">Sign up for free</span>
      </Link>
    </form>
  );
}
