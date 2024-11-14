"use client";

import Image from "next/image";
import { Button } from "../Button";
import { Box } from "../Box";

export const PromptForm = (props: {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}) => {
  const editable = ["lesson plan", "grade 4", "Habitats & Communities"];
  const spans = editable.map((text) => (
    <span key={0} className="text-grad outline-none" contentEditable={true}>
      {text}
    </span>
  ));
  const class_name = props.className ? props.className : "";
  return (
    <div className={"mx-32 " + class_name}>
      <Box>
        <div className={"mx-12 my-32 flex flex-col h-full"}>
          <p className="text-3xl">
            I want to create a {spans[0]} for a {spans[1]} class learning about{" "}
            {spans[2]}
          </p>
          <div className="flex">
            <Button onClick={() => console.log("Shuffle!")}>
              <Image
                src="shuffle.svg"
                alt="Menu"
                width={24}
                height={24}
                className="m-1 mx-2"
              />
            </Button>
            <Button onClick={() => props.setShowForm((prev) => !prev)}>
              <Image
                src="puzzle.svg"
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
