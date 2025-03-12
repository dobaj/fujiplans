"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function About() {
    const router = useRouter();
  return (
    <div className="bg-bg relative w-full">
      <div className="flex flex-col justify-items-center relative">
        <img
          className="absolute top-0 left-0"
          src="/cornerline.svg"
          alt="corner line"
          width={390}
          height={543}
        />
        <button className="mx-auto mb-[-1rem]" onClick={()=>router.push("/home")}>
          <img
            src="/logo.svg"
            alt="Fujiplans Logo"
            width={636}
            height={244}
          />
        </button>
        <h1
          className="mx-auto mt-[-3rem] font-PJS font-bold text-xl md:text-2xl lg:text-3xl xl:text-6xl
            bg-gradient-to-r from-light-pink via-light-pink via-50% to-dark-yellow inline-block 
            bg-clip-text text-transparent"
        >
          about us
        </h1>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col ml-[12.5rem] mt-[14rem]">
          <img className="absolute" src="/win.png" width={600} height={500} />
          <img
            className="mt-[-2rem] ml-[-1rem]"
            src="/winblob.svg"
            width={610}
            height={500}
          />
          <p className="font-PJS text-5xl mx-auto">
            Fall Demo Day{" "}
            <span className="text-pink font-bold underline">Winners</span>
          </p>
        </div>
        <div className="absolute right-0">
          <img src="/curlyarrow.svg" width={600} height={500} />
        </div>
      </div>
      <div className="flex flex-col relative gap-y-[7rem]">
        <div className="relative w-full flex justify-end">
          <img className="" src="/circleline.svg" width={500} height={400} />
          <p className="absolute text-PJS text-6xl mt-[9rem]">
            Meet the team
            <span className="block">behind FujiPlans</span>
          </p>
        </div>
        <div className="flex flex-row px-[10rem] gap-10">
          <img
            className="ml-[-7rem]"
            src="/seeds3.svg"
            width={500}
            height={500}
          />
          <p className="font-PJS text-2xl text-center tracking-wide pl-[10rem]">
            Meet the team behind FujiPlans, a group comprised of 1 Product
            Manager, 4 Business Analysts, 2 Designers, and 4 Software Developers
            united by a mission to transform lesson planning. With a deep
            passion for education and innovation, we leverage AI to dramatically
            reduce the time teachers spend on administrative tasks, ensuring
            they can focus on what truly matters: their students. Winning Fall
            Demo Day confirmed our commitment to pushing the boundaries of
            what's possible and fostering a collaborative community of
            educators. By pairing curriculum alignment, user-friendly
            automation, and ongoing classroom insights, we aim to create a
            platform that redefines how teachers approach lesson planning.
          </p>
        </div>
      </div>
      <div>
        <img
          className="ml-[10rem]"
          src="/sparkline.svg"
          width={400}
          height={400}
        />
        <img
          className="mx-auto my-[-8rem]"
          src="/teamphoto.png"
          width={1300}
          height={314}
        />
      </div>
      <div className="py-[8rem]"></div>
    </div>
  );
}
