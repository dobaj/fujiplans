import { MdFavorite } from "react-icons/md";
import { FaPeopleRobbery } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { Button } from "./Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const NavBar = () => {
  const router = useRouter();
  return (
    <div className="flex flex-row justify-between items-center max-h-40 pb-24">
      <div className="flex-1 flex gap-[1rem]">
        <button
          onClick={() => router.push("/home")}
          className="flex-grow-0 ml-5"
        >
          <IoMdHome className="m-2 w-[32px] h-auto text-gray-600 hover:text-gray-700" />
        </button>
        <button
          className="flex-grow-0"
          onClick={() => router.push("/home/favourites")}
        >
          <MdFavorite className="m-2 w-[32px] h-auto text-gray-600 hover:text-gray-700" />
        </button>
        <button
          onClick={() => router.push("/home/community")}
          className="flex-grow-0"
        >
          <FaPeopleRobbery className="m-2 w-[32px] h-auto text-gray-600 hover:text-gray-700" />
        </button>
      </div>
      <button className="mt-4" onClick={() => router.push("/home")}>
        <Image
          src="/logo.svg"
          alt="Fujiplans Logo"
          width={0}
          height={0}
          className="my-4 self-start w-auto h-[110px]"
          priority={true}
        />
      </button>
      <Button
        className={"flex-1 justify-end font-bold"}
        onClick={() => router.push("/about")}
      >
        <div className="px-3 py-2">about us</div>
      </Button>
    </div>
  );
};
