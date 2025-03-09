"use client";

import React from "react";
import Image from "next/image";
import { MDViewer } from "@/components/MDViewer";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/Button";

function ButtonAlt({src, alt, text}: {src: string, alt: string, text: string}) {
  const [hover, setHover] = React.useState(false);

  return(
    <Button onMouseEnter={()=> setHover(true)} onMouseLeave={() => setHover(false)}>
      {hover ? (<span className="font-PJS text-white font-semibold m-3 w-[4rem] mx-4">{text}</span>) : 
      (<Image src={src} alt={alt} width={0} height={0} className="m-2 w-[4rem] h-auto mx-4 px-4"/>)}
    </Button>
  )
}

export default function Results() {
  const router = useRouter();

  return (
    <body className="bg-background">
      <div className="flex h-dvh bg-background ">
        <div className="m-10 mt-2 flex flex-grow flex-col max-ha-full">
          {/* Nav Bar */}
          <div className="flex flex-row justify-between items-center max-h-16 mb-24">
            <div className="flex-1 flex">
              <button className="flex-grow-0">
                <Image
                  src="/menuIcon.svg"
                  alt="Menu"
                  width={0}
                  height={0}
                  className="m-2 w-[48px] h-auto"
                />
              </button>
            </div>
            <Image
              src="/logo.svg"
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
              <ButtonAlt src="/download.svg" alt="Download" text="Save"/>
              <ButtonAlt src="/edit.svg" alt="Edit" text="Edit"/>
              <ButtonAlt src="/back.svg" alt="Go Back" text="Return"/>
            </div>
            <MDViewer />
          </div>
        </div>
      </div>
    </body>
  );
}
