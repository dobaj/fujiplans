"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/utils/axios";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { ClickableBox } from "@/components/ClickableBox";
import CloseDialog from "@/components/common/CloseDialog";
import { NavBar } from "@/components/common/NavBar";

export default function Favourites() {
  const router = useRouter();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteLesson, setDeleteLesson] = useState(false);
  const [deleteId, setDeleteId] = useState<number>(-1);

  const [favourites, setFavourites] = useState<
    { id: number; title: string; content: string }[]
  >([]);
  const [lessonIndex, setLessonIndex] = useState<number | undefined>(undefined);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getAPI() {
    try {
      const res = await axios.get("/lessons/getFavourites");
      setFavourites(res.data.favourite_lessons);
    } catch (error) {
      console.error("Error updating lesson:", error);
    }
  }

  useEffect(() => {
    // Load favourites
    getAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (lessonIndex !== undefined && favourites[lessonIndex]) {
      console.log(favourites[lessonIndex]);
      const lesson = favourites[lessonIndex];
      sessionStorage.setItem("lesson_id", lesson.id.toString());
      sessionStorage.setItem("HTMLContent", lesson.content);
      // sessionStorage.setItem("favourite", lesson.favourited.toString());
      router.push("/results");
    }
  }, [favourites, lessonIndex, router]);

  useEffect(() => {
    if (deleteLesson && deleteId > 0) {
      setDeleteLesson(false);
      setDeleteId(-1);
      setDialogOpen(false);
      axios
        .delete("/lessons/deleteFavourite", {
          params: { lesson_id: deleteId },
        })
        .then(() => {
          console.log("deleted", deleteId);
          getAPI();
        });
    }
  }, [axios, deleteId, deleteLesson, getAPI]);

  return (
    <main className="min-h-screen bg-background">
      <div className="flex h-dvh bg-background ">
        <div className="p-10 pt-2 flex flex-grow flex-col h-full max-h-full">
          {/* Nav Bar */}
          <NavBar />
          {favourites.length === 0 ? (
            <div>
              <h1 className="text-3xl text-gray-500">No lessons :(</h1>
            </div>
          ) : (
            <div className={"flex w-full min-w-full overflow-hidden"}>
              <div className={"col-span-2 h-full text-xl"}>
                <div
                  className={
                    "grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 h-3/4 items-start"
                  }
                  style={{ gridAutoRows: "1fr" }}
                >
                  {favourites
                    .sort((a, b) => a.id - b.id)
                    .map(
                      (
                        {
                          title,
                          id,
                        }: {
                          title: string;
                          id: number;
                        },
                        i,
                      ) => {
                        return (
                          <ClickableBox
                            key={id}
                            darkMode={false}
                            onClick={() => {}}
                          >
                            <div className="flex w-full justify-between">
                              <p style={{ color: "" }} className={"pr-4"}>
                                {title}
                              </p>
                              <div className="flex gap-x-1">
                                <button
                                  onClick={() => {
                                    setLessonIndex(i);
                                  }}
                                >
                                  <MdEditSquare className="m-2 w-[32px] h-auto text-gray-600 hover:text-gray-700" />
                                </button>

                                <button
                                  onClick={() => {
                                    setDialogOpen(true);
                                    setDeleteId(id);
                                  }}
                                >
                                  <MdDelete className="m-2 w-[32px] h-auto text-gray-600 hover:text-gray-700" />
                                </button>
                              </div>
                            </div>
                          </ClickableBox>
                        );
                      },
                    )}
                </div>
              </div>
              <CloseDialog
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                setConfirmationOpen={setDeleteLesson}
                text="Are you sure you want to delete this?"
                buttonText="Delete"
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
