import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export const MDViewer = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("README.md")
      .then((res) => res.text())
      .then((text) => setContent(text));
  }, []);

  return (
    <div className="mx-4 flex-grow overflow-y-auto">
      <div className="bg-white p-8 min-h-full rounded-3xl border-2 border-black">
        {/* eslint-disable-next-line react/no-children-prop */}
        <ReactMarkdown children={content} />
      </div>
    </div>
  );
};
