"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import axios from "@/utils/axios";
import { isAxiosError } from "axios";

export default function PostForm() {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e.target.files[0]) {
      // Validate file type
      const fileType = e.target.files[0].type;
      if (fileType !== "application/pdf") {
        setError("Only PDF files are allowed");
        return;
      }

      // Validate file size (max 20MB)
      if (e.target.files[0].size > 20 * 1024 * 1024) {
        setError("File size must be less than 20MB");
        return;
      }

      setFile(e.target.files[0]);
      setError("");
    }
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation
    if (!description.trim()) {
      setError("Description is required");
      setIsLoading(false);
      return;
    }

    if (!file) {
      setError("Please upload a PDF file or switch to using Markdown");
      setIsLoading(false);
      return;
    }

    try {
      // Create FormData object to handle file uploads
      const formData = new FormData();
      formData.append("description", description);

      formData.append("pdfFile", file);

      // Use FormData in the request
      const { data } = await axios.post("/posts/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", data.pdf_url);
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        setError(error.response.data.message || "An error occurred");
      } else {
        setError("An unexpected error occurred");
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description*</label>
          <textarea
            className="w-full px-3 py-2 border rounded"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's this post about?"
            required
          />
        </div>

        <div className="mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Upload PDF*</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              required
              className="w-full"
            />
            <p className="text-sm text-gray-500 mt-1">
              Maximum file size: 20MB. Only PDF files are accepted.
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
