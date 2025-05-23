"use client";

import Image from "next/image";
import { useState } from "react";
import { MdChevronLeft } from "react-icons/md";
import { ClickableBox } from "../ClickableBox";
import { Plugins } from "@/app/home/page";

export const PluginsForm = (props: {
  selectedTab: number;
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setPlugins: React.Dispatch<React.SetStateAction<Plugins>>;
  plugins: Plugins;
}) => {
  const [addName, setAddName] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);

  const addPlugin = () => {
    if (addName !== "") {
      props.setPlugins((prev) => {
        // Create a deep copy of the previous state
        const newPlugins = JSON.parse(JSON.stringify(prev));

        // Add the new element to the appropriate tab
        newPlugins[props.selectedTab].elements.push({
          name: addName,
          active: false,
        });

        return newPlugins;
      });
      setAddName("");
    }
  };

  const changeTab = (newTab: number) => {
    if (addName !== "") {
      addPlugin();
    }
    props.setSelectedTab(newTab);
  };

  const changeElement = (name: string) => {
    if (name !== "" && editingIndex !== -1) {
      props.setPlugins((prev) => {
        // Create a deep copy of the previous state
        const newPlugins = JSON.parse(JSON.stringify(prev));

        // Update the element at the editing index
        const selected = prev[props.selectedTab].elements[editingIndex].active;
        newPlugins[props.selectedTab].elements[editingIndex] = {
          name: name,
          active: selected,
        };

        return newPlugins;
      });
      setEditingIndex(-1);
    }
  };

  const toggleActive = (index: number, active: boolean) => {
    props.setPlugins((prev) => {
      // Create a deep copy of the previous state
      const newPlugins = JSON.parse(JSON.stringify(prev));

      // Toggle the active state of the element
      newPlugins[props.selectedTab].elements[index].active = !active;

      return newPlugins;
    });
  };

  const goBack = () => {
    if (addName !== "") {
      addPlugin();
    }
    props.setShowForm(true);
  };

  return (
    <div className="flex flex-col flex-grow mb-10">
      <button onClick={() => goBack()} className="w-fit">
        <MdChevronLeft className="h-8 w-8" />
      </button>

      <div className={"grid grid-cols-3 mt-10 flex-grow"}>
        <div className={"col-span-1 h-3/4 flex flex-col justify-between"}>
          {props.plugins.map((tab, i) => (
            <div key={tab.name} className="flex">
              <p
                className="text-3xl m-2 hover:font-semibold hover:cursor-pointer"
                style={{ fontWeight: props.selectedTab === i ? "bold" : "" }}
                key={`tab-${tab.name}`}
                onClick={() => changeTab(i)}
              >
                {tab.name}
              </p>
              <Image
                src="/right-chevron.svg"
                alt="Menu"
                width={0}
                height={0}
                className="m-1 mr-2 h-full w-auto self-center"
              />
            </div>
          ))}
        </div>
        <div className={"col-span-2 h-full text-xl"}>
          <div
            className={"grid grid-cols-2 gap-x-12 gap-y-10 h-3/4 items-start"}
            style={{ gridAutoRows: "1fr" }}
          >
            {props.selectedTab !== -1 &&
              props.plugins[props.selectedTab].elements.map(
                ({ name, active }, i) => {
                  return (
                    <ClickableBox
                      key={`element-${props.selectedTab}-${i}`}
                      darkMode={active}
                      onClick={() => {
                        setEditingIndex(i);
                        toggleActive(i, active);
                      }}
                    >
                      <p
                        style={{ color: active ? "white" : "" }}
                        contentEditable={true}
                        onClick={(event) => {
                          setEditingIndex(i);
                          event.stopPropagation();
                        }}
                        onBlur={(change) =>
                          changeElement(
                            (change.target as HTMLElement).innerText,
                          )
                        }
                        suppressContentEditableWarning={true}
                        className={"w-fit pr-4"}
                      >
                        {name}
                      </p>
                    </ClickableBox>
                  );
                },
              )}
            <ClickableBox darkMode={false} onClick={() => {}}>
              <input
                className="focus:outline-1 bg-transparent"
                placeholder="Type your own..."
                value={addName}
                onChange={(change) => {
                  setAddName(change.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && addName !== "") {
                    addPlugin();
                  }
                }}
              />
            </ClickableBox>
          </div>
        </div>
      </div>
    </div>
  );
};
