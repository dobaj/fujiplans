"use client";
import { PromptForm, toString } from "@/components/forms/PromptForm";
import React, { useState } from "react";
import Image from "next/image";
import { PluginsForm } from "@/components/forms/PluginsForm";
import {Button} from "@/components/common/Button"
import { useRouter } from "next/navigation";
import { GradButton } from "@/components/GradButton";
import useAxios from "@/hooks/useAxiosInt";

export type PluginCategory = { name: string; active: boolean };

export type Plugins = { name: string; elements: PluginCategory[] }[];

export default function Prompt() {
  const router = useRouter();
  const axios = useAxios();


  async function test(){
    console.log("test");
    const message = "Give me a weekly lesson plan for a 5th grade math class on multiplication. Include concepts about sharks. I want to spend half of each day for the next week on this lesson. By the end, I want students to be able to confidently multiply 2-digit numbers by 2-digit numbers and understand the diversity in ecosystems.";
    try {
      const startTime = performance.now();
      const res = await axios.post("/lessons/", {message}, {responseType: "blob"}); 
      const endTime = performance.now();
      console.log(`API response time: ${(endTime - startTime).toFixed(2)} ms`);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "lesson.pdf");
      link.click();
      link.remove();

    } catch (error) {
      console.log(error); 
    } 
  }

  const defaultPlugins = [
    {
      name: "Creative Elements",
      elements: [
        { name: "The ocean", active: true },
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
        { name: "Art", active: true },
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
        { name: "Grade 5", active: true },
        { name: "Grade 6", active: false },
        { name: "Grade 7", active: false },
        { name: "Grade 8", active: false },
      ],
    },
    {
      name: "Learning Goals",
      elements: [
        { name: "Use reading comprehension strategies", active: false },
        { name: "Understand form and style", active: false },
        { name: "Demonstrate understanding of content", active: true },
        { name: "Reflect on skills and strategies", active: false },
        { name: "Make inferences", active: false },
      ],
    },
    {
      name: "Topic",
      elements: [
        { name: "Multiplication", active: false },
        { name: "Intro to chemistry", active: false },
        { name: "Local governments", active: false },
        { name: "Watercolour painting", active: true },
        { name: "Biodiversity", active: false },
      ],
    },
  ];

  const [selectedTab, setSelectedTab] = useState(0);
  const [showForm, setShowForm] = useState(true);
  const [plugins, setPlugins] = useState<Plugins>(defaultPlugins);

  const randomizePlugins = () => {
    setPlugins((prev) => {
      const newArr = prev.map((tab) => {
        //Clear elements and set one randomly true
        const elements = tab.elements.map(({ name }) => ({
          name: name,
          active: false,
        }));
        const randIndex = Math.round(Math.random() * (elements.length - 1));
        elements[randIndex] = { name: elements[randIndex].name, active: true };

        return {
          name: tab.name,
          elements: elements,
        };
      });
      return newArr;
    });
  };

  const navigateToTab = (name: string) => {
    plugins.forEach((tab, i) => {
      if (name === tab.name) {
        setSelectedTab(i);
        setShowForm(false);
      }
    });
  };

  return (
    <body className="bg-background">
      <div className="flex">
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
            <button onClick={test}>
              pdf test
            </button>
          </div>

          {showForm ? (
            <div className="flex-grow flex flex-col justify-around w-full">
              <PromptForm
                setShowForm={setShowForm}
                plugins={plugins}
                randomizePlugins={randomizePlugins}
                navigateToTab={navigateToTab}
              />

              <div className="flex items-center justify-center">
                <GradButton
                  onClick={() => {
                    console.log(toString());
                    router.push("/results");
                  }}
                >
                  <div className="flex items-center font-bold text-3xl mb-4 mx-5 my-2">
                    generate
                  </div>
                </GradButton>
              </div>
            </div>
          ) : (
            <PluginsForm
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              setShowForm={setShowForm}
              setPlugins={setPlugins}
              plugins={plugins}
            />
          )}
        </div>
      </div>
    </body>
  );
}
