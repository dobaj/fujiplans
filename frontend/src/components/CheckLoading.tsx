"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function CheckLoading({
  children,
}: {
  children: React.ReactNode;
}) {
  const { tokenLoading } = useSelector((state: RootState) => state.token);
  const { userLoading } = useSelector((state: RootState) => state.user);

  return tokenLoading || userLoading ? <div>loading...</div> : children;
}
