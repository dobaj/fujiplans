"use client";

import { useState, useEffect, useRef } from "react";
// import { FaHeart } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { FiUpload } from "react-icons/fi";
import { Post } from "@/types/user";
import axios from "@/utils/axios";
import { Subject } from "@/types/user";
import { NavBar } from "@/components/common/NavBar";
import Loader from "@/components/loading/Loader";

type PostData = {
  title: string;
  subject: Subject;
  description: string;
  file: File | null;
};

export default function TeacherResourcePlatform() {
  const [activeTab, setActiveTab] = useState("browse");
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [postData, setPostData] = useState<PostData>({
    title: "",
    subject: "",
    description: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setPostData((prev) => ({ ...prev, file: event.dataTransfer.files[0] }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Check for null before accessing files
    if (e.target.files && e.target.files.length > 0) {
      setPostData((prev) => ({
        ...prev,
        [e.target.name]: e.target.files![0],
      }));
    }
  };

  const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("subject", postData.subject);
    formData.append("description", postData.description);
    formData.append("pdfFile", postData.file!);

    setLoading(true);

    try {
      await axios.post("/posts/", formData);
      setPostData({
        title: "",
        subject: "",
        description: "",
        file: null,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data } = await axios.get("/posts");
        setPosts(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    if (activeTab === "browse") {
      fetchData();
    }
  }, [activeTab]);

  const subjects: Subject[] = [
    "Math",
    "Science",
    "History",
    "English",
    "Art",
    "Music",
    "Physical Education",
    "Computer Science",
    "Foreign Languages",
  ];

  // const toggleFavorite = async (id: string) => {
  //   const post = posts.find((post) => post._id === id);
  //   if (!post) return;
  //
  //   setPosts((prev) => {
  //     const updatedPosts = prev.map((p) =>
  //       p._id === id ? { ...p, is_favorited: !p.is_favorited } : p,
  //     );
  //     return updatedPosts;
  //   });
  //
  //   try {
  //     await axios.put("/posts/", {
  //       post_id: id,
  //       add: !post.is_favorited,
  //     });
  //
  //     console.log("Post favorited", !post.is_favorited);
  //   } catch (error) {
  //     console.log;
  //   }
  // };

  const toggleSubjectFilter = (subject: Subject) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const filteredPosts =
    selectedSubjects.length > 0
      ? posts.filter((post) => selectedSubjects.includes(post.subject))
      : posts;

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-gradient-to-br from-[#F5F1E9] to-[#F5F1E9]/90 h-full w-full">
      <main className="mx-auto container h-full w-full pt-[1rem]">
        <NavBar />
        <div className="flex border-b border-[#292F36]/20 mb-8">
          <button
            onClick={() => setActiveTab("browse")}
            className={`px-6 py-3 font-medium text-lg ${activeTab === "browse" ? "border-b-2 border-[#D9918D] text-[#292F36]" : "text-[#292F36]/60"}`}
          >
            Browse Lessons
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`px-6 py-3 font-medium text-lg ${activeTab === "create" ? "border-b-2 border-[#D9918D] text-[#292F36]" : "text-[#292F36]/60"}`}
          >
            Create Post
          </button>
        </div>

        {activeTab === "browse" ? (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
              <div className="relative w-full md:w-auto">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center gap-2 p-3 rounded-lg border border-[#292F36]/20 bg-white hover:bg-[#F5F1E9] transition duration-300 w-full md:w-auto"
                >
                  <CiFilter size={20} />
                  <span>Filter by Subject</span>
                  <FaChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${filterOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {filterOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-[#292F36]/10 p-3">
                    <div className="grid grid-cols-2 gap-2">
                      {subjects.map((subject) => (
                        <div key={subject} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={subject}
                            checked={selectedSubjects.includes(subject)}
                            onChange={() => toggleSubjectFilter(subject)}
                            className="rounded text-[#D9918D] focus:ring-[#D9918D]"
                          />
                          <label htmlFor={subject} className="text-sm">
                            {subject}
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex justify-between">
                      <button
                        onClick={() => setSelectedSubjects([])}
                        className="text-sm text-[#292F36]/70 hover:text-[#292F36]"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {selectedSubjects.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-6">
                <span className="text-sm text-[#292F36]/60">
                  Active filters:
                </span>
                {selectedSubjects.map((subject) => (
                  <span
                    key={subject}
                    className="text-sm bg-[#ECF2A2] px-3 py-1 rounded-full flex items-center gap-1"
                  >
                    {subject}
                    <IoMdClose
                      size={14}
                      className="cursor-pointer"
                      onClick={() => toggleSubjectFilter(subject)}
                    />
                  </span>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-[#292F36]/10 hover:shadow-lg transition duration-300 flex flex-col h-full"
                >
                  <div className="bg-gradient-to-r from-[#D9918D] to-[#ECF2A2] p-1" />
                  <div className="p-5 flex flex-col h-full w-full">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-xl text-[#292F36]">
                          {post.title}
                        </h3>
                        <p className="text-sm text-[#292F36]/70">
                          {post.subject}
                        </p>
                      </div>
                      {/* <button */}
                      {/*   onClick={() => toggleFavorite(post._id)} */}
                      {/*   className={`p-2 rounded-full ${post.is_favorited ? "text-[#D9918D]" : "text-[#292F36]/30 hover:text-[#D9918D]/70"}`} */}
                      {/* > */}
                      {/*   <FaHeart */}
                      {/*     fill={post.is_favorited ? "#D9918D" : "gray"} */}
                      {/*     size={20} */}
                      {/*   /> */}
                      {/* </button> */}
                    </div>
                    <p className="text-sm mb-4 text-[#292F36]/80 line-clamp-3">
                      {post.description}
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#ECF2A2] flex items-center justify-center">
                          {post.poster.first_name[0]}
                          {post.poster.last_name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {post.poster.first_name} {post.poster.last_name}
                          </p>
                        </div>
                      </div>
                      <a
                        className="bg-gradient-to-r from-[#D9918D] to-[#ECF2A2] text-[#292F36] font-medium px-6 py-3 rounded-lg hover:opacity-90 transition duration-300"
                        href={post.gcs_url}
                        target="_blank"
                      >
                        View Lesson
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-[#292F36] mb-6">
              Share Your Lesson Plan
            </h2>

            <form onClick={(e) => e.stopPropagation()} onSubmit={createPost}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-[#292F36]/70 mb-1">
                    Lesson Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    className="w-full p-3 rounded-lg border border-[#292F36]/20 focus:outline-none focus:ring-2 focus:ring-[#D9918D]"
                    placeholder="E.g., Creative Writing Workshop"
                    value={postData.title}
                    onChange={(e) =>
                      setPostData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#292F36]/70 mb-1">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={postData.subject}
                    onChange={(e) => {
                      setPostData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }));
                    }}
                    className="w-full p-3 rounded-lg border border-[#292F36]/20 focus:outline-none focus:ring-2 focus:ring-[#D9918D] bg-white"
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-[#292F36]/70 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full p-3 rounded-lg border border-[#292F36]/20 focus:outline-none focus:ring-2 focus:ring-[#D9918D] min-h-32"
                  placeholder="Describe your lesson plan and how it can be used..."
                  name="description"
                  value={postData.description}
                  onChange={(e) =>
                    setPostData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </div>

              <div
                className="mb-6"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
              >
                <label className="block text-sm font-medium text-[#292F36]/70 mb-1">
                  Upload Lesson Plan (PDF)
                </label>
                <input
                  type="file"
                  name="file"
                  ref={inputRef}
                  accept="application/pdf" // Changed to PDF since that's what you're asking for
                  className="hidden"
                  onChange={handleFileChange}
                />

                <div className="border-2 border-dashed border-[#292F36]/20 rounded-lg p-8 text-center hover:bg-[#F5F1E9]/50 transition duration-300 cursor-pointer">
                  {!postData.file ? (
                    <>
                      <FiUpload
                        className="mx-auto mb-2 text-[#D9918D]"
                        size={36}
                      />
                      <p className="text-sm text-[#292F36]/70">
                        Drag and drop your PDF file here, or click to browse
                      </p>
                      <p className="text-xs text-[#292F36]/50 mt-2">
                        Maximum file size: 20MB
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-[#292F36]/70">
                      {postData.file.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#D9918D] to-[#ECF2A2] text-[#292F36] font-medium px-6 py-3 rounded-lg hover:opacity-90 transition duration-300"
                >
                  Publish Lesson Plan
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
