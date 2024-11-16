"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/Button";
import { MDViewer } from "@/components/MDViewer";
import { useRouter } from "next/navigation";

export default function Results() {
  const router = useRouter();

  return (
    <div className="flex h-dvh bg-background ">
      <div className="m-10 mt-2 flex flex-grow flex-col max-ha-full">
        {/* Nav Bar */}
        <div className="flex flex-row justify-between items-center max-h-16 mb-24">
          <div className="flex-1 flex">
            <button className="flex-grow-0">
              <Image
                src="menuIcon.svg"
                alt="Menu"
                width={0}
                height={0}
                className="m-2 w-[48px] h-auto"
              />
            </button>
          </div>
          <Image
            src="logo.svg"
            alt="Fujiplans Logo"
            width={0}
            height={0}
            className="my-4 self-start w-[300px] h-auto"
            priority={true}
          />
          <Button className={"flex-1 justify-end font-bold"}>
            <div className="mx-3 my-2">about us</div>
          </Button>
        </div>
        <div className={"flex flex-grow"}>
          <div className="flex flex-col justify-end gap-y-6">
            <Button className="">
              <Image
                src="download.svg"
                alt="Download"
                width={0}
                height={0}
                className="m-2 w-[4rem] h-auto mx-4 px-4"
              />
            </Button>
            <Button className="">
              <Image
                src="edit.svg"
                alt="Edit"
                width={0}
                height={0}
                className="m-2 w-[4rem] h-auto mx-4 px-4"
              />
            </Button>
            <Button className="" onClick={() => router.push("/prompt")}>
              <Image
                src="back.svg"
                alt="Go Back"
                width={0}
                height={0}
                className="m-2 w-[4rem] h-auto mx-4 px-4"
              />
            </Button>
          </div>
          <MDViewer />
        </div>
      </div>
    </div>
  );
}
