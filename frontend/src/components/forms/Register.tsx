"use client";

import { useState } from "react";
import axios from "@/utils/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/slices/tokenSlice";
import { addUser } from "@/redux/slices/userSlice";
import { openGooglePopup } from "@/utils/openGooglePopup";
import useGoogleLogin from "@/hooks/useGoogleLogin";
import Input from "../common/Input";
import Image from "next/image";

type Registerinfo = {
  Email: string;
  Password: string;
  FirstName: string;
  LastName: string;
};

export default function Register() {
  const [info, setInfo] = useState<Registerinfo>({
    Email: "",
    Password: "",
    FirstName: "",
    LastName: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useGoogleLogin();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    try {
      setLoading(true);
      e.preventDefault();
      const { data } = await axios.post("/users/register/", info);

      localStorage.setItem("refresh_token", data.refresh_token);
      dispatch(setToken(data.access_token));
      dispatch(addUser(data.user));

      router.push("/home");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="flex flex-col xl:w-[30%] w-full justify-center"
    >
      <h2 className="text-grad font-semibold text-4xl mb-[1rem]">Sign up</h2>
      <div className="flex gap-[1rem]">
        <Input
          labelName="FirstName"
          onChange={(e) =>
            setInfo({ ...info, [e.target.name]: e.target.value })
          }
          value={info.FirstName}
          type="text"
        />
        <Input
          labelName="LastName"
          onChange={(e) =>
            setInfo({ ...info, [e.target.name]: e.target.value })
          }
          value={info.LastName}
          type="text"
        />
      </div>
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
      <div className="flex flex-col gap-[1rem] mt-[1.5rem]">
        <button
          className="bg-grad p-[0.5rem] rounded-[1rem] h-[4rem] w-full"
          aria-disabled={loading}
        >
          {loading ? (
            "Making account..."
          ) : (
            <span className="text-[#717568] font-bold text-lg">Sign up</span>
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
          Sign up with Google
        </button>
      </div>
      <Link href={"/login"} className="mt-[1rem] text-center">
        Already have an account?{" "}
        <span className="text-grad">Login in here</span>
      </Link>
    </form>
  );
}
