"use client";
import React, { useState, useRef, useEffect } from "react";

interface HTMLEditorProps {
  content: string;
  setContent: (content: string) => void;
  editing: boolean;
}

const HTMLEditor: React.FC<HTMLEditorProps> = ({
  content,
  setContent,
  editing,
}) => {
  const [editingElement, setEditingElement] = useState<HTMLElement | null>(
    null,
  );
  const [editContent, setEditContent] = useState<string>("");
  const [editTagName, setEditTagName] = useState<string>("");
  const [editPath, setEditPath] = useState<string[]>([]);
  const [styleTag, setStyleTag] = useState<string>("");
  const [htmlContent, setHtmlContent] = useState<string>("");

  // Reference to track if we've applied initial content
  const contentApplied = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const editRef = useRef<HTMLDivElement>(null);

  // Parse the content string into HTML and CSS parts when content changes
  useEffect(() => {
    if (!content) return;

    try {
      // Extract the style tag from the HTML
      const styleTagMatch = content.match(/<style>([\s\S]*?)<\/style>/);
      if (styleTagMatch && styleTagMatch[1]) {
        setStyleTag(styleTagMatch[1]);
      } else {
        setStyleTag("");
      }

      // Extract the body content from the HTML
      const bodyContentMatch = content.match(/<body>([\s\S]*?)<\/body>/);
      if (bodyContentMatch && bodyContentMatch[1]) {
        setHtmlContent(bodyContentMatch[1].trim());
      } else {
        // If no body tags, use the entire content but strip any style tags
        const withoutStyle = content
          .replace(/<style>[\s\S]*?<\/style>/g, "")
          .trim();
        setHtmlContent(withoutStyle);
      }

      contentApplied.current = true;
    } catch (error) {
      console.error("Error parsing HTML content:", error);
      setHtmlContent(content);
    }
  }, [content]);

  // Update the parent content when changes are made to htmlContent
  useEffect(() => {
    if (!htmlContent || !contentApplied.current) return;

    // Build the complete HTML document
    const fullHtml = styleTag
      ? `<html>
  <head>
    <style>${styleTag}</style>
  </head>
  <body>
    ${htmlContent}
  </body>
</html>`
      : htmlContent;

    // Only update if the content has actually changed
    if (fullHtml !== content) {
      setContent(fullHtml);
    }
  }, [htmlContent, styleTag, setContent, content]);

  // Generate a path to uniquely identify an element
  const generateElementPath = (element: HTMLElement | null): string[] => {
    if (!element || !element.tagName) return [];
    if (element === containerRef.current) return [];

    const path = [];
    let currentElement: HTMLElement | null = element;

    while (currentElement && currentElement !== containerRef.current) {
      // Get the element's position among siblings with the same tag
      const tagName = currentElement.tagName.toLowerCase();
      const siblings = Array.from(
        currentElement.parentElement?.children || [],
      ).filter((sibling) => sibling.tagName.toLowerCase() === tagName);

      const position = siblings.indexOf(currentElement) + 1;
      path.unshift(`${tagName}:nth-of-type(${position})`);

      currentElement = currentElement.parentElement;
    }

    return path;
  };

  // Function to save changes using the path-based approach
  const saveChanges = (): void => {
    if (editPath.length === 0 || !containerRef.current) return;

    try {
      // Create a temporary container with current HTML
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlContent;

      // Find the target element within the temporary HTML
      let currentElement: Element | null = tempDiv;
      for (const selector of editPath) {
        const [tagName, nthPosition] = selector.split(":nth-of-type(");
        const position = parseInt(nthPosition.replace(")", "")) - 1;

        const childElements: Element[] = Array.from(
          currentElement?.children || [],
        ).filter((child) => child.tagName.toLowerCase() === tagName);

        if (childElements.length <= position) return;
        currentElement = childElements[position];
        if (!currentElement) return;
      }

      if (currentElement) {
        // Update the element content
        currentElement.innerHTML = editContent;

        // Get the updated HTML
        setHtmlContent(tempDiv.innerHTML);
      }
    } catch (error) {
      console.error("Error updating HTML:", error);
    } finally {
      // Reset editing state
      setEditingElement(null);
      setEditContent("");
      setEditTagName("");
      setEditPath([]);
    }
  };

  // Function to handle clicking on an element
  const handleElementClick = (e: React.MouseEvent): void => {
    if (!editing) return;

    // Don't handle clicks on the container itself
    if (e.target === containerRef.current) return;

    // Don't reopen editor if already editing
    if (editingElement) return;

    e.stopPropagation();
    e.preventDefault();

    const target = e.target as HTMLElement;

    // Store element data
    setEditingElement(target);
    setEditContent(target.innerHTML);
    setEditTagName(target.tagName.toLowerCase());

    // Generate path for this element
    const path = generateElementPath(target);
    setEditPath(path);

    console.log("Element being edited:", {
      tagName: target.tagName,
      path: path,
      content:
        target.innerHTML.substring(0, 50) +
        (target.innerHTML.length > 50 ? "..." : ""),
    });
  };

  // Handle click outside to save
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (editRef.current && !editRef.current.contains(e.target as Node)) {
        saveChanges();
      }
    };

    if (editingElement) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [editingElement, editContent, editPath]);

  // Handle escape key to cancel editing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        setEditingElement(null);
        setEditContent("");
        setEditTagName("");
        setEditPath([]);
      } else if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        // Save on Ctrl+Enter or Cmd+Enter
        saveChanges();
      }
    };

    if (editingElement) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [editingElement, editContent, editPath]);

  // When no content is available
  if (!content) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        No content available
      </div>
    );
  }

  return (
    <div className="w-[900px] h-full relative overflow-auto bg-white rounded-lg mx-auto">
      {/* Apply the extracted styles */}
      <style dangerouslySetInnerHTML={{ __html: styleTag }} />

      {/* Rendered HTML content */}
      <div
        ref={containerRef}
        className={`w-full h-full ${editing ? "cursor-pointer" : ""}`}
        onClick={handleElementClick}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Editing overlay */}
      {editingElement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            ref={editRef}
            className="bg-white rounded-lg p-4 w-full max-w-2xl shadow-xl"
          >
            <h3 className="text-lg font-semibold mb-2">
              Edit{" "}
              <code className="bg-gray-100 px-1 py-0.5 rounded">
                {editTagName}
              </code>{" "}
              Content
            </h3>
            <textarea
              className="w-full h-64 border border-gray-300 rounded p-2 mb-4 font-mono text-sm"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              autoFocus
            />
            <div className="flex justify-between">
              <div className="text-sm text-gray-500">
                Use{" "}
                <kbd className="px-1 py-0.5 bg-gray-100 border border-gray-300 rounded">
                  Ctrl+Enter
                </kbd>{" "}
                to save
              </div>
              <div className="flex space-x-2">
                <button
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => {
                    setEditingElement(null);
                    setEditContent("");
                    setEditTagName("");
                    setEditPath([]);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={saveChanges}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HTMLEditor;
