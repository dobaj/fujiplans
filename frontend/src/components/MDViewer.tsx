"use client";

import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import ReactMarkdown from "react-markdown";

export const MDEditor = ({
  editing,
  content,
  setContent,
}: {
  editing: boolean;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}) => {
  // TODO: Use html viewer instead of markdown
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleAreaChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setContent(event.target.value);
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset the height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content
    }
  }, [content, editing]);

  return (
    <div className="mx-4 h-full max-h-full overflow-hidden">
      <div className="bg-white p-5 pl-8 pr-0 rounded-3xl border-2 border-black h-full">
        <div className="h-full overflow-y-auto pr-8">
          {editing ? (
            <textarea
              ref={textareaRef}
              className=" w-full outline-none resize-none"
              defaultValue={content}
              onChange={handleAreaChange}
            />
          ) : (
            /* eslint-disable-next-line react/no-children-prop */
            <ReactMarkdown children={content} />
          )}
        </div>
      </div>
    </div>
  );
};
