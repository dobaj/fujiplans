"use client";

import Image from "next/image";
import { Button } from "../common/Button";
import { Box } from "../common/Box";
import { Plugins } from "@/app/home/prompt/page";
const spans: { [key: string]: React.JSX.Element } = {};

export const toPromptString = () => {
  return `I want to create a lesson plan for a ${spans["Scope"].props.children} ${spans["Subject"].props.children} class learning about ${spans["Topic"].props.children}. Include ${spans["Creative Elements"].props.children}. By the end, I want students to be able to ${spans["Learning Goals"].props.children}.`;
};

export const PromptForm = (props: {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  plugins: Plugins;
  className?: string;
  randomizePlugins: () => void;
  navigateToTab: (name: string) => void;
}) => {
  props.plugins.forEach((tab) => {
    //All active items
    let items = tab.elements
      .filter((item) => item.active)
      .map((item) => item.name.toLowerCase());

    //Special cases
    if (items.length > 1) {
      if (items.length == 2) {
        items = [items.join(" and ")];
      } else {
        items[items.length - 2] = items.slice(-2).join(", and ");
        items.pop();
      }
    }

    spans[tab.name] = (
      <span
        className="text-grad outline-none hover:cursor-pointer"
        onClick={() => props.navigateToTab(tab.name)}
      >
        {items.join(", ")}
      </span>
    );
  });

  const class_name = props.className ? props.className : "";
  return (
    <div className={"mx-32 " + class_name}>
      <Box>
        <div className={"mx-12 my-32 flex flex-col h-full"}>
          <p className="text-3xl">
            I want to create a lesson plan for a {spans["Scope"]}{" "}
            {spans["Subject"]} class learning about {spans["Topic"]}. Include{" "}
            {spans["Creative Elements"]}. By the end, I want students to be able
            to {spans["Learning Goals"]}.
          </p>
          <div className="flex gap-3 mt-2">
            <Button onClick={() => props.randomizePlugins()}>
              <Image
                src="/shuffle.svg"
                alt="Menu"
                width={24}
                height={24}
                className="m-1 mx-2"
              />
            </Button>
            <Button onClick={() => props.setShowForm((prev) => !prev)}>
              <Image
                src="/puzzle.svg"
                alt="Menu"
                width={24}
                height={24}
                className="m-1 mx-2"
              />
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
};
