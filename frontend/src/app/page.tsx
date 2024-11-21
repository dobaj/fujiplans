import Link from "next/link";
import Pdfanimation from "@/components/common/Pdfanimation";

export default function Page() {
  return (
    <main className="h-full w-full bg-black">
      <p className="text-white">hello world</p>
      <Link href={"/login"} className="mr-5 text-white">
        Login
      </Link>
      <Link href={"/register"} className="text-white">
        Register
      </Link>
      <div className="h-[80%] w-full flex justify-center items-center">
        <Pdfanimation />
      </div>
    </main>
  );
}
