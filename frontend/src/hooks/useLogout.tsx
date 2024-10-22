"use client";
import axios from "@/utils/axios";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/tokenSlice";
import { logoutUser } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";

export default function useLogout() {
  const router = useRouter();
  const dispatch = useDispatch();

  async function logoutHook() {
    try {
      dispatch(logout());
      dispatch(logoutUser());
      const res = await axios.post("/users/");
      console.log(res);
      router.push("/");
      return;
    } catch (error) {
      console.log(error);
    }
  }

  return logoutHook;
}
