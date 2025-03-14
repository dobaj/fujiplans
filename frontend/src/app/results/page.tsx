"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/Button";
import useAxios from "@/hooks/useAxiosInt";
import CloseDialog from "@/components/common/CloseDialog";
import HTMLEditor from "@/components/HTMLEditor";
// import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { NavBar } from "@/components/common/NavBar";

function HoverAlt({
  alt,
  children,
}: {
  alt: string;
  children?: React.ReactNode;
}) {
  const [hover, setHover] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? (
        <div className="flex justify-center w-full">
          <span className="font-PJS text-black font-semibold">{alt}</span>
        </div>
      ) : (
        <></>
      )}
      {children}
    </div>
  );
}

export default function Results() {
  const router = useRouter();
  const axios = useAxios();
  const [content, setContent] = useState("");
  const [editing, setEditing] = useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [goBack, setGoBack] = React.useState(false);
  // const [favourite, setFavourite] = useState(false);
  const [lesson_id, setLesson_id] = useState<number | undefined>(undefined);

  useEffect(() => {
    const data = sessionStorage.getItem("HTMLContent");
    const lessonId = sessionStorage.getItem("lesson_id");
    // const favouriteData = sessionStorage.getItem("favourite");

    if (lessonId && lessonId !== "") {
      setLesson_id(parseInt(lessonId, 10));
    }
    if (data) {
      setContent(data);
    }
    // if (favouriteData) {
    //   setFavourite(favouriteData === "true");
    // }
  }, []);

  useEffect(() => {
    if (router && goBack) {
      router.back();
    }
  }, [goBack, router]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function updateAPI() {
    // setFavourite((prev) => !prev);
    const h1Pattern = /<h1[^>]*>(.*?)<\/h1>/i;

    // Execute the regex to find matches
    const match = content.match(h1Pattern);

    // Return the captured group (text inside h1) or null if not found
    const title = match ? match[1] : "Lesson Plan";
    try {
      const res = await axios.post("/lessons/updateLesson", {
        content,
        // favourite,
        title,
        lesson_id,
      });
      setLesson_id(res.data.lesson_id);
      sessionStorage.setItem("lesson_id", res.data.toString());
    } catch (error) {
      console.error("Error updating lesson:", error);
    }
  }

  useEffect(() => {
    sessionStorage.setItem("HTMLContent", content);
    updateAPI();
    // sessionStorage.setItem("favourite", favourite.toString());
  }, [content]);

  const handleDownload = async () => {
    const res = await axios.post(
      "/lessons/convertHTML/",
      { message: content },
      { responseType: "blob" },
    );
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "lesson.pdf");
    link.click();
    link.remove();
  };

  return (
    <main className="min-h-screen bg-background relative">
      <div className="flex h-dvh bg-background ">
        <div className="p-10 pt-2 flex flex-grow flex-col h-full max-h-full">
          <NavBar />
          <div className={"flex-grow flex w-full min-w-full overflow-hidden"}>
            <div className="flex flex-col justify-end gap-y-6 absolute bottom-10">
              <HoverAlt alt="Download">
                <Button className="" onClick={() => handleDownload()}>
                  <Image
                    src="/download.svg"
                    alt="Download"
                    width={0}
                    height={0}
                    className="m-2 w-[4rem] h-auto mx-4 px-4"
                  />
                </Button>
              </HoverAlt>
              <HoverAlt alt="Edit">
                <Button
                  className=""
                  onClick={() => setEditing((prev) => !prev)}
                >
                  <Image
                    src="/edit.svg"
                    alt="Edit"
                    width={0}
                    height={0}
                    className="m-2 w-[4rem] h-auto mx-4 px-4"
                  />
                </Button>
              </HoverAlt>
              {/* <HoverAlt alt="Favourite"> */}
              {/*   <Button className="" onClick={updateAPI}> */}
              {/*     {favourite ? ( */}
              {/*       <MdFavorite className="m-2 w-[4rem] h-auto mx-4 px-4" /> */}
              {/*     ) : ( */}
              {/*       <MdFavoriteBorder className="m-2 w-[4rem] h-auto mx-4 px-4" /> */}
              {/*     )} */}
              {/*   </Button> */}
              {/* </HoverAlt> */}
              <HoverAlt alt="Back">
                <Button className="" onClick={() => setDialogOpen(true)}>
                  <Image
                    src="/back.svg"
                    alt="Go Back"
                    width={0}
                    height={0}
                    className="m-2 w-[4rem] h-auto mx-4 px-4"
                  />
                </Button>
              </HoverAlt>
            </div>
            <div className="pl-2 h-full max-h-full flex-grow">
              {/* Replace MDEditor with our new HTMLEditor */}
              <HTMLEditor
                editing={editing}
                content={content}
                setContent={setContent}
              />
              <CloseDialog
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                setConfirmationOpen={setGoBack}
                text="Are you sure you want to go back? The lesson plan may not be saved."
                buttonText="Go Back"
              />
            </div>
            {/* Visual feedback on save */}
            {editing && (
              <div className="absolute bottom-12 right-12">
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm opacity-75">
                  Click any element to edit
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
