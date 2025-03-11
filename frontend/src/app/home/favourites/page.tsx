"use client";
import React, { useEffect, useState } from "react";
import FavouriteDisplay from "@/components/FavouriteDisplay";
import Image from "next/image";
import axios from "@/utils/axios";

// TODO: Add type to favs
// TODO: Add user and filename field to favourite creation
export default function Favourites() {
  const [favs, setFavs] = useState([]);
  useEffect(() => {
    (async function fetchData() {
      try {
        const { data } = await axios.get("/users/favourites/");
        console.log(data);
        setFavs(data.favourites);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <main className="bg-[#F5F1E9] w-full h-full relative">
      <Image
        src={"/ellipse.svg"}
        alt="ellipse"
        height={500}
        width={800}
        className="absolute left-0 top-0"
      />
      <div className="flex items-center justify-between">
        <div>
          {/* Menu placeholder */}
          menu
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={"/fujiplans.svg"}
            alt="logo"
            height={250}
            width={350}
            className="mt-[1rem] ml-[1rem]"
          />
          <h1 className="text-grad text-5xl mt-[-2rem]">Favourites</h1>
        </div>
        <div>
          {/* About us placeholder */}
          about us
        </div>
      </div>
      <div className="flex flex-wrap justify-evenly gap-4 px-4 mt-12">
        {favs.map((fav) => (
          <FavouriteDisplay
            key={fav._id}
            pdfUrl={fav.gcs_url}
            fileName={fav.original_filename}
            subject={fav.subject}
            // user={fav.user}
          />
        ))}
      </div>
    </main>
  );
}
