import Link from "next/link";
import Image from "next/image";
import Pdfanimation from "@/components/common/Pdfanimation";

export default function Page() {
  return (
    <div className="bg-bg flex flex-col justify-center items-center">
      <div className="z-0 mt-[5rem]">
        <Image
          className="mt-[2.5rem] blur-2xl"
          alt="blob"
          src="/blob.svg"
          width={1374}
          height={741.93}
        />
      </div>
      <div className="relative mt-[-10rem] md:mt-[-20rem] lg:mt-[-30rem] xl:mt-[-42rem]">
        <Image
          className="absolute z-30 mt-[-18rem] ml-[-20rem]"
          alt="FujiPlans logo"
          src="/fujiplans.svg"
          width={766.53}
          height={255.59}
        />
        <Pdfanimation />
        <div className="flex gap-[1rem] absolute top-[15rem] left-[40rem]">
          <Link
            href={"/login"}
            className="flex justify-center border-2 w-[10rem] h-[5rem] items-center font-bold text-2xl border-theme-stroke-red rounded-[3rem] text-white bg-grad hover:bg-[#00000080]"
          >
            Login
          </Link>
          <Link
            href={"/register"}
            className="flex justify-center border-2 w-[10rem] h-[5rem] items-center font-bold text-2xl border-theme-stroke-red rounded-[3rem] text-white bg-grad hover:bg-[#00000080]"
          >
            Register
          </Link>
        </div>
        <Image
          className="absolute z-10 ml-[20rem] md:ml-[30rem] lg:ml-[40rem] xl:ml-[58rem] mt-[-5rem] md:mt-[-7rem] lg:mt-[-10rem] xl:mt-[-13.5rem] -rotate-6"
          alt="seeds1"
          src="/seeds1.svg"
          width={493}
          height={638}
        />
        <h1
          className={`flex justify-center text-center text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold font-PJS mt-[-0.5rem] md:mt-0 lg:mt-[0.5rem] xl:mt-[1rem]
          drop-shadow-md`}
        >
          Empowering Teachers to Use AI
        </h1>
        <Image
          className="ml-[10rem] md:ml-[20rem] lg:ml-[30rem] xl:ml-[38.5rem]"
          alt="underline"
          src="/underline.svg"
          width={335}
          height={46}
        />
      </div>
      <div className="relative mt-[2rem] md:mt-[3rem] lg:mt-[4rem] xl:mt-[4.5rem]">
        <p
          className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-PJS text-center whitespace-pre-line font-light`}
        >
          FujiPlans is an AI-powered platform <br />
          designed to <span className="text-pink">simplify</span> the lesson
          planning <br />
          process for teachers.
        </p>
        <Image
          className="mx-auto mt-[2rem] md:mt-[3rem] lg:mt-[4rem] xl:mt-[4.5rem]"
          alt="frame1"
          src="/frame1.svg"
          width={219}
          height={200}
        />
        <Image
          className="absolute z-10 ml-[10rem] md:ml-[20rem] lg:ml-[30rem] xl:ml-[48rem] mt-[-10rem] md:mt-[-20rem] lg:mt-[-30rem] xl:mt-[-35.5rem] -rotate-270"
          alt="seeds2"
          src="/seeds2.svg"
          width={434}
          height={591}
        />
      </div>
      <div className="mt-[4.5rem] md:mt-[5rem] lg:mt-[6rem] xl:mt-[7rem]">
        <p
          className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-PJS text-center whitespace-pre-line font-light`}
        >
          By inputting a written prompt, our tool generates <br />
          <span
            className="bg-gradient-to-r from-light-pink via-light-pink via-50%
          to-yellow inline-block bg-clip-text text-transparent whitespace-pre"
          >
            customized, high-quality lesson plans
          </span>{" "}
          tailored to any <br />
          discipline, with a focus on elementary and middle <br />
          school curriculums.
        </p>
        <Image
          className="mx-auto mt-[2rem] md:mt-[3rem] lg:mt-[4rem] xl:mt-[4.5rem]"
          alt="frame2"
          src="/frame2.svg"
          width={252}
          height={195}
        />
      </div>
      <div className="mt-[2rem] md:mt-[3rem] lg:mt-[4rem] xl:mt-[4.5rem]">
        <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-PJS text-center whitespace-pre-line font-light">
          Our goal is to
          <span
            className="bg-gradient-to-r from-light-pink via-light-pink via-50%
          to-yellow inline-block bg-clip-text text-transparent whitespace-pre"
          >
            {" "}
            save you time{" "}
          </span>
          and
          <br />
          enhance the educational experience <br />
          for your students.
        </p>
        <Image
          className="mx-auto mt-[2rem] md:mt-[3rem] lg:mt-[4rem] xl:mt-[4.5rem]"
          alt="frame3"
          src="/frame3.svg"
          width={268}
          height={208}
        />
        <Image
          className="absolute z-50 ml-[-11rem] md:ml-[-13rem] lg:ml-[-15rem] xl:ml-[-17rem] mt-[-35rem] md:mt-[-40rem] lg:mt-[-45rem] xl:mt-[-49.5rem] -rotate-125"
          alt="seeds3"
          src="/seeds3.svg"
          width={434}
          height={591}
        />
      </div>
      <div className="pt-[5rem]"></div>
    </div>
  );
}
