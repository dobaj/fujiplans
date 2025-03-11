import React from "react";
import Image from "next/image";
import { Button } from "./common/Button";
import { FaFileDownload } from "react-icons/fa";

interface FavouriteDisplayProps {
  pdfUrl: string;
  fileName: string;
  subject: string;
  user?: string;
}

export default function FavouriteDisplay({
  pdfUrl,
  fileName,
  subject,
  user,
}: FavouriteDisplayProps) {
  return (
    <div className="mb-[2rem] z-[10]">
      <div className="bg-white h-[360px] w-[280px] flex justify-center items-center rounded-lg">
        <div className="flex flex-col gap-[1rem] justify-center items-center">
          <Image src={"/fujiplans.svg"} alt="test" height={150} width={200} />
          <Button className="mt-[3rem]">
            <a href={pdfUrl}>
              <FaFileDownload className="h-6 w-6 m-2" />
            </a>
          </Button>
        </div>
      </div>
      <div className="mt-[1rem]">
        <h2 className="font-bold text-2xl">{fileName}</h2>
        <p className="text-lg">Subject: {subject}</p>
      </div>
    </div>
  );
}
