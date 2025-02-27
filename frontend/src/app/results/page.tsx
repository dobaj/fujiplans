"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MDEditor } from "@/components/MDViewer";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/Button";
import useAxios from "@/hooks/useAxiosInt";
import CloseDialog from "@/components/common/CloseDialog";

export default function Results() {
  const router = useRouter();
  const axios = useAxios();

  const [content, setContent] = useState("");
  const [editing, setEditing] = useState(false);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [goBack, setGoBack] = React.useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem("markdownContent");
    if (data) setContent(JSON.parse(data).content);
  }, []);

  useEffect(()=> {
    if (router && goBack) {
      router.push("/home");
    }
  }, [goBack, router])

  const handleDownload = async () => {
    const res = await axios.post(
        "/lessons/convertMD",
        { message: content },
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "lesson.pdf");
      link.click();
      link.remove();
  }

  
  return (
    <main className="min-h-screen bg-background">
      <div className="flex h-dvh bg-background ">
        <div className="p-10 pt-2 flex flex-grow flex-col h-full max-h-full">
          {/* Nav Bar */}
          <div className="flex flex-row justify-between items-center max-h-40 pb-24">
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
              className="my-4 self-start w-auto h-[110px]"
              priority={true}
            />
            <Button className={"flex-1 justify-end font-bold"}>
              <div className="px-3 py-2">about us</div>
            </Button>
          </div>
          <div className={"flex-grow flex w-full min-w-full overflow-hidden"}>
            <div className="flex flex-col justify-end gap-y-6">
              <Button className="" onClick={() => handleDownload()}>
                <Image
                  src="/download.svg"
                  alt="Download"
                  width={0}
                  height={0}
                  className="m-2 w-[4rem] h-auto mx-4 px-4"
                />
              </Button>
              <Button className="" onClick={()=>setEditing((prev)=>!prev)}>
                <Image
                  src="/edit.svg"
                  alt="Edit"
                  width={0}
                  height={0}
                  className="m-2 w-[4rem] h-auto mx-4 px-4"
                />
              </Button>
              <Button className="" onClick={()=>setDialogOpen(true)}>
                <Image
                  src="/back.svg"
                  alt="Go Back"
                  width={0}
                  height={0}
                  className="m-2 w-[4rem] h-auto mx-4 px-4"
                />
              </Button>
            </div>
            <div className="pl-2 h-full max-h-full flex-grow">
              <MDEditor editing={editing} content={content} setContent={setContent}/>
              <CloseDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} setConfirmationOpen={setGoBack}/>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
