"use client";
import { PromptForm, toPromptString } from "@/components/forms/PromptForm";
import React, { useState } from "react";
import { PluginsForm } from "@/components/forms/PluginsForm";
import { useRouter } from "next/navigation";
import { GradButton } from "@/components/GradButton";
import axios from "@/utils/axios";
import Loader from "@/components/loading/Loader";
import { NavBar } from "@/components/common/NavBar";

export type PluginCategory = { name: string; active: boolean };

export type Plugins = { name: string; elements: PluginCategory[] }[];

export default function Prompt() {
  const router = useRouter();

  async function getResult() {
    const message = toPromptString();
    try {
      const res = await axios.post("/lessons/getLesson/", { message });

      setLoading(false);
      sessionStorage.setItem("HTMLContent", res.data.message);
      sessionStorage.setItem("lesson_id", res.data.lesson_id);
      // sessionStorage.setItem("favourite", "false");
      router.push("/results");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
  const [isLoading, setLoading] = useState<boolean>(false);

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="flex">
        <div className="m-10 mt-2 flex flex-grow flex-col max-h-full">
          <NavBar />

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
                  className="mt-4"
                  onClick={() => {
                    setLoading(true);
                    getResult();
                  }}
                >
                  <div className="flex items-center font-bold text-3xl mb-4 mx-5 my-2">
                    Generate
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
    </main>
  );
}
