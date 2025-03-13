"use client";

import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { FiUpload } from "react-icons/fi";

export default function TeacherResourcePlatform() {
  const [activeTab, setActiveTab] = useState("browse");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);

  // Sample data
  const samplePosts = [
    {
      id: 1,
      name: "Alex Johnson",
      school: "Westlake High School",
      subject: "Mathematics",
      title: "Quadratic Equations Interactive Lesson",
      description:
        "A comprehensive lesson plan that introduces quadratic equations through real-world examples and interactive activities. Includes digital and printable worksheets.",
      favorites: 24,
      isFavorited: false,
    },
    {
      id: 2,
      name: "Maya Rodriguez",
      school: "Riverside Elementary",
      subject: "Science",
      title: "Exploring Ecosystems",
      description:
        "This hands-on lesson plan guides students through creating their own miniature ecosystems while learning about biodiversity and environmental balance.",
      favorites: 31,
      isFavorited: true,
    },
    {
      id: 3,
      name: "David Kim",
      school: "Central Middle School",
      subject: "History",
      title: "Ancient Civilizations Compare & Contrast",
      description:
        "Students explore similarities and differences between ancient Egyptian, Greek, and Roman civilizations through collaborative research and creative presentations.",
      favorites: 18,
      isFavorited: false,
    },
  ];

  const subjects = [
    "Mathematics",
    "Science",
    "History",
    "English",
    "Art",
    "Music",
    "Physical Education",
    "Computer Science",
    "Foreign Languages",
  ];

  const toggleFavorite = (id) => {
    // Would implement actual favoriting logic here
  };

  const toggleSubjectFilter = (subject) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const filteredPosts =
    selectedSubjects.length > 0
      ? samplePosts.filter((post) => selectedSubjects.includes(post.subject))
      : samplePosts;

  return (
    <div className="bg-gradient-to-br from-[#F5F1E9] to-[#F5F1E9]/90 h-full w-full">
      <main className="mx-auto container h-full w-full">
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
              <div className="relative w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="Search lesson plans..."
                  className="w-full p-3 pl-10 rounded-lg border border-[#292F36]/20 focus:outline-none focus:ring-2 focus:ring-[#D9918D]"
                />
                <IoIosSearch
                  className="absolute left-3 top-3.5 text-[#292F36]/60"
                  size={20}
                />
              </div>

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
                  key={post.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-[#292F36]/10 hover:shadow-lg transition duration-300"
                >
                  <div className="bg-gradient-to-r from-[#D9918D] to-[#ECF2A2] p-1" />
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-[#292F36]">
                          {post.title}
                        </h3>
                        <p className="text-sm text-[#292F36]/70">
                          {post.subject}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleFavorite(post.id)}
                        className={`p-2 rounded-full ${post.isFavorited ? "text-[#D9918D]" : "text-[#292F36]/30 hover:text-[#D9918D]/70"}`}
                      >
                        <FaHeart
                          fill={post.isFavorited ? "#D9918D" : "none"}
                          size={20}
                        />
                      </button>
                    </div>

                    <p className="text-sm mb-4 text-[#292F36]/80 line-clamp-3">
                      {post.description}
                    </p>

                    <div className="flex justify-between items-center mt-[2.5rem]">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-[#ECF2A2] flex items-center justify-center">
                          {post.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{post.name}</p>
                          <p className="text-xs text-[#292F36]/60">
                            {post.school}
                          </p>
                        </div>
                      </div>
                      <button className="bg-gradient-to-r from-[#D9918D] to-[#ECF2A2] text-[#292F36] font-medium px-6 py-3 rounded-lg hover:opacity-90 transition duration-300">
                        View Lesson
                      </button>
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

            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#292F36]/70 mb-1">
                  Lesson Title
                </label>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg border border-[#292F36]/20 focus:outline-none focus:ring-2 focus:ring-[#D9918D]"
                  placeholder="E.g., Creative Writing Workshop"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-[#292F36]/70 mb-1">
                    Subject
                  </label>
                  <select className="w-full p-3 rounded-lg border border-[#292F36]/20 focus:outline-none focus:ring-2 focus:ring-[#D9918D] bg-white">
                    <option value="">Select a subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#292F36]/70 mb-1">
                    School
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-lg border border-[#292F36]/20 focus:outline-none focus:ring-2 focus:ring-[#D9918D]"
                    placeholder="Your school name"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-[#292F36]/70 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full p-3 rounded-lg border border-[#292F36]/20 focus:outline-none focus:ring-2 focus:ring-[#D9918D] min-h-32"
                  placeholder="Describe your lesson plan and how it can be used..."
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[#292F36]/70 mb-1">
                  Upload Lesson Plan (PDF)
                </label>
                <div className="border-2 border-dashed border-[#292F36]/20 rounded-lg p-8 text-center hover:bg-[#F5F1E9]/50 transition duration-300 cursor-pointer">
                  <FiUpload className="mx-auto mb-2 text-[#D9918D]" size={36} />
                  <p className="text-sm text-[#292F36]/70">
                    Drag and drop your PDF file here, or click to browse
                  </p>
                  <p className="text-xs text-[#292F36]/50 mt-2">
                    Maximum file size: 20MB
                  </p>
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
