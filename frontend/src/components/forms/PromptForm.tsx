import { Button } from "../common/Button";
import { FaRegPaperPlane } from "react-icons/fa";

export const PromptForm = () => {
  const editable = ["lesson plan", "grade 4", "Habitats & Communities"];
  const spans = editable.map((text, index) => (
    <span
      key={index}
      className="text-theme-green outline-none"
      contentEditable={true}
    >
      {text}
    </span>
  ));
  return (
    <div className="mx-12 flex flex-col justify-between h-full">
      <div></div>
      <div>
        <p className="text-5xl">
          I want to create a {spans[0]} for a {spans[1]} class learning about{" "}
          {spans[2]}
        </p>
        <p className="text-4xl mt-5 text-slate-400">
          Click the green text to edit
        </p>
      </div>
      <Button>
        <div className="flex">
          Generate
          <FaRegPaperPlane className="ml-2 self-center" />
        </div>
      </Button>
    </div>
  );
};
