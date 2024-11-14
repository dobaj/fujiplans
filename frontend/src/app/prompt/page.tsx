"use client";
import { PromptForm } from "@/components/forms/PromptForm";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/Button";
import { PluginsForm } from "@/components/forms/PluginsForm";

export type PluginCategory = { name: string; active: boolean };

export type Plugins = { name: string; elements: PluginCategory[] }[];

export default function Prompt() {
  const defaultPlugins = [
    {
      name: "Creative Elements",
      elements: [
        { name: "The ocean", active: false },
        { name: "Recent innovations in technology", active: false },
        { name: "Popular TV shows", active: false },
        { name: "Harry Potter", active: false },
        { name: "Local plant species", active: false },
      ],
    },
    {
      name: "Subject",
      elements: [
        { name: "Math", active: false },
        { name: "Art", active: false },
        { name: "Science", active: false },
        { name: "Social Studies", active: false },
        { name: "English", active: false },
      ],
    },
    {
      name: "Scope",
      elements: [
        { name: "Grade 3", active: false },
        { name: "Grade 4", active: false },
        { name: "Grade 5", active: false },
        { name: "Grade 6", active: false },
        { name: "Grade 7", active: false },
        { name: "Grade 8", active: false },
      ],
    },
    {
      name: "Learning Goals",
      elements: [
        { name: "Using reading comprehension strategies", active: false },
        { name: "Understanding form and style", active: false },
        { name: "Demonstrating understanding of content", active: false },
        { name: "Reflecting on skills and strategies", active: false },
        { name: "Making inferences", active: false },
      ],
    },
    {
      name: "Topic",
      elements: [
        { name: "Multiplication", active: false },
        { name: "Intro to chemistry", active: false },
        { name: "Local governments", active: false },
        { name: "Watercolour painting", active: false },
        { name: "Biodiversity", active: false },
      ],
    },
  ];

  const [showForm, setShowForm] = useState(true);
  const [plugins, setPlugins] = useState<Plugins>(defaultPlugins);
  return (
    <div className="flex h-dvh bg-background ">
      <div className="m-10 mt-2 flex flex-grow flex-col max-h-full">
        {/* Nav Bar */}
        <div className="flex flex-row justify-between items-center max-h-16 mb-24">
          <div className="flex-1 flex">
            <button className="flex-grow-0">
              <Image
                src="menuIcon.svg"
                alt="Menu"
                width={0}
                height={0}
                className="m-2 w-[48px] h-auto"
              />
            </button>
          </div>
          <Image
            src="logo.svg"
            alt="Fujiplans Logo"
            width={0}
            height={0}
            className="my-4 self-start w-[300px] h-auto"
            priority={true}
          />
          <Button className={"flex-1 justify-end font-bold"}>
            <div className="mx-3 my-2">about us</div>
          </Button>
        </div>

        {showForm ? (
          <div className="flex-grow flex flex-col justify-around w-full">
            <PromptForm setShowForm={setShowForm} />

            <div className="flex items-center justify-center">
              <Button onClick={() => console.log("Generate!")}>
                <div className="flex items-center font-bold text-3xl mb-4 mx-5 my-2">
                  generate
                </div>
              </Button>
            </div>
          </div>
        ) : (
          <PluginsForm
            setShowForm={setShowForm}
            setPlugins={setPlugins}
            plugins={plugins}
          />
        )}
      </div>
    </div>
  );
}
