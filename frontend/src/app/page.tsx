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
          className="absolute z-30 xl:mt-[-18rem] xl:ml-[-12rem] md:mt-[-15rem] ml-[1.25rem] mt-[-10rem]"
          alt="FujiPlans logo"
          src="/fujiplans.svg"
          width={766.53}
          height={255.59}
        />
        <div className="ml-[7.5rem]">
          <Pdfanimation />
        </div>
        <div className="flex gap-[1rem] absolute top-[14rem] left-1/2 transform -translate-x-1/2 xl:top-[10rem] xl:left-[40rem] xl:transform-none lg:top-[25rem] md:top-[20rem]">
        <Link
          href={"/login"}
          className="flex justify-center border-2 w-[8rem] h-[3rem] md:w-[10rem] md:h-[5rem] items-center font-bold text-lg md:text-2xl 
          border-theme-stroke-red rounded-[3rem] text-white bg-grad hover:bg-[#00000080]">
          Login
        </Link>
        <Link
          href={"/register"}
          className="flex justify-center border-2 w-[8rem] h-[3rem] md:w-[10rem] md:h-[5rem] items-center font-bold text-lg md:text-2xl 
          border-theme-stroke-red rounded-[3rem] text-white bg-grad hover:bg-[#00000080]">
          Register
        </Link>
        </div>
        <div className="flex-col justify-center item-center">
          <h1
            className={`text-2xl md:text-3xl lg:text-4xl xl:text-7xl font-semibold font-PJS mt-[-0.5rem] md:mt-[1rem] lg:mt-[0.5rem] xl:mt-[1rem]
            drop-shadow-md`}>
            Empowering Teachers to Use AI
          </h1>
          <Image
            className="mx-auto"
            alt="underline"
            src="/underline.svg"
            width={335}
            height={46}
          />
        </div>
      </div>
      <div className="relative mt-[2rem] md:mt-[3rem] lg:mt-[4rem] xl:mt-[4.5rem]">
        <p
          className={`text-xl md:text-2xl lg:text-3xl xl:text-5xl font-PJS text-center whitespace-pre-line font-light`}
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
      </div>
      <div className="mt-[4.5rem] md:mt-[5rem] lg:mt-[6rem] xl:mt-[7rem]">
        <p
          className={`text-xl md:text-2xl lg:text-3xl xl:text-5xl font-PJS text-center whitespace-pre-line font-light`}
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
        <p className="text-xl md:text-2xl lg:text-3xl xl:text-5xl font-PJS text-center whitespace-pre-line font-light">
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
      </div>
      <div className="pt-[5rem]"></div>
    </div>
  );
}
