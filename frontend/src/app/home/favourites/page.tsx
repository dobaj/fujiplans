"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/utils/axios";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { ClickableBox } from "@/components/ClickableBox";
import { Dialog } from "@base-ui-components/react";
import { NavBar } from "@/components/common/NavBar";
import Loader from "@/components/loading/Loader";

type Lesson = { _id: string; title: string; content: string };
export default function Favourites() {
  const router = useRouter();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lesson, setLesson] = useState<Lesson | null>(null);

  const [favourites, setFavourites] = useState<Lesson[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getAPI() {
    setLoading(true);
    try {
      const res = await axios.get("/lessons/getFavourites");
      setFavourites(res.data.favourite_lessons);
    } catch (error) {
      console.error("Error updating lesson:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Load favourites
    getAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function editLesson(lesson: Lesson) {
    sessionStorage.setItem("lesson_id", lesson._id);
    sessionStorage.setItem("HTMLContent", lesson.content);
    router.push("/results");
  }

  async function deleteLesson(lesson: Lesson) {
    try {
      await axios.delete("/lessons/deleteFavourite", {
        data: { lesson_id: lesson._id },
      });

      setFavourites((prev) => {
        return prev.filter((l) => l._id !== lesson._id);
      });
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
  }

  if (loading) {
    return <Loader />;
  }

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
                  {favourites.map((lesson: Lesson) => {
                    return (
                      <ClickableBox
                        key={lesson._id}
                        darkMode={false}
                        onClick={() => {}}
                      >
                        <div className="flex w-full justify-between items-center">
                          <p style={{ color: "" }} className={"pr-4"}>
                            {lesson.title}
                          </p>
                          <div className="flex gap-x-1">
                            <button onClick={() => editLesson(lesson)}>
                              <MdEditSquare className="m-2 w-[32px] h-auto text-gray-600 hover:text-gray-700" />
                            </button>

                            <button
                              onClick={() => {
                                setDialogOpen(true);
                                setLesson(lesson);
                              }}
                            >
                              <MdDelete className="m-2 w-[32px] h-auto text-gray-600 hover:text-gray-700" />
                            </button>
                          </div>
                        </div>
                      </ClickableBox>
                    );
                  })}
                </div>
              </div>
              <Dialog.Root open={dialogOpen}>
                <Dialog.Portal>
                  <Dialog.Backdrop className="fixed inset-0 bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-70" />
                  <Dialog.Popup className="fixed top-[calc(50%+1.25rem*var(--nested-dialogs))] left-1/2 -mt-8 w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 scale-[calc(1-0.1*var(--nested-dialogs))] rounded-lg bg-gray-50 p-6 text-gray-900 outline outline-1 outline-gray-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[has-nested-dialogs]:after:absolute data-[has-nested-dialogs]:after:inset-0 data-[has-nested-dialogs]:after:rounded-[inherit] data-[has-nested-dialogs]:after:bg-black/5 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:outline-gray-300">
                    <Dialog.Title className="-mt-1.5 mb-1 text-lg font-medium">
                      Are you sure you want to delete this lesson?
                    </Dialog.Title>
                    <form
                      className="mt-4 flex flex-col gap-6"
                      onSubmit={(event) => {
                        event.preventDefault();
                        // Close the dialog when submitting
                        setDialogOpen(false);
                        if (lesson) {
                          deleteLesson(lesson);
                        }
                      }}
                    >
                      <div className="flex justify-end gap-4">
                        <Dialog.Close
                          onClick={() => {
                            setDialogOpen(false);
                            setLesson(null);
                          }}
                          className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100"
                        >
                          Cancel
                        </Dialog.Close>
                        <button
                          type="submit"
                          className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-red-500 px-3.5 text-base font-medium text-gray-100 select-none hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </form>
                  </Dialog.Popup>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
