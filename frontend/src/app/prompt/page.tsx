import { Box } from "@/components/Box";
import { MdMenu } from "react-icons/md";
import { PromptForm } from "@/components/forms/PromptForm";
import { RowBox } from "@/components/RowBox";
import React from "react";

export default function Prompt() {

  return (
    <div className="flex h-dvh bg-background ">
      <div className="m-10 mt-2 flex flex-grow-0 flex-col max-h-full">
        <button className="m-2 w-min"><MdMenu className="size-8" /></button>
        <div className="w-full h-full grid grid-cols-3 gap-10">
          <Box span={1}>
            <div className="text-3xl mb-10">
              Building Blocks
            </div>
            <div className="flex flex-col h-full flex-grow basis-0 overflow-y-auto gap-5">
              <RowBox>
                <div className="text-3xl">
                  Add a focus word
                </div>
              </RowBox>
              <RowBox>
                <div className="text-3xl">
                  Make a real world connection
                </div>
              </RowBox>
              <RowBox>
                <div className="text-3xl">
                  Make a connection to previous material
                </div>
              </RowBox>
              <RowBox>
                <div className="text-3xl">
                  Learn in groups
                </div>
              </RowBox>
            </div>
          </Box>
          <Box span={2}>
            <PromptForm />
          </Box>
        </div>
      </div>
    </div>);
};
