"use client";

import React, { useState, useEffect } from "react";
import PostForm from "@/components/forms/PostForm";
import axios from "@/utils/axios";

export default function Fyp() {
  const [data, setData] = useState("");

  useEffect(() => {
    (async function fetchData() {
      try {
        const { data } = await axios.get("/posts/");
        setData(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div>
      <PostForm />
    </div>
  );
}
