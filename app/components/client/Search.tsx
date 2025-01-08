"use client";

// Next
import Image from "next/image";

// React >>
import { useState, useEffect } from "react";

// Icons >>
import { BiSearch } from "react-icons/bi";
import { serchMovie } from "@/app/api/api";
import { IoCloseSharp } from "react-icons/io5";

// Components >>
import CardActions from "./CardActions";

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [debouncedValue, setDebouncedValue] = useState(inputValue);
  const [close, setClose] = useState(false);

  // Debounce the inputValue >> set the input value after while
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500);

    setClose(false);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!debouncedValue) return;
        const res = await serchMovie(debouncedValue);
        const filteredResults = res.results.filter((movie: any) =>
          movie.genre_ids.includes(16)
        );
        setData(filteredResults || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [debouncedValue]);
  const relatedClass =
    "w-full md:w-2/4  mx-auto bg-black/30 backdrop-blur-md  ";
  return (
    <div className="z-50 relative flex flex-col  items-center w-full">
      <div
        className={`flex items-center justify-between gap-2 rounded-full ${relatedClass}`}>
        <input
          className="bg-transparent border-none outline-none px-4 py-2 flex-1 placeholder:text-white dark:placeholder:text-secondary"
          placeholder="Search..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <BiSearch className="text-xl text-secondary mr-4 cursor-pointer transition-colors duration-300 active:text-active" />
      </div>

      {!close && data.length > 0 && debouncedValue.length > 0 && (
        <div
          className={`z-50 absolute top-16 mt-2 left-1/2 -translate-x-1/2 
                      overflow-hidden shadow-lg border-t-2 border-active rounded-xl ${relatedClass} `}>
          <IoCloseSharp
            className="text-lg  text-active bg-black/10 p-2 rounded-md cursor-pointer ml-auto w-9 h-9 hover:scale-110 hover:text-red-600 hover:bg-black/30 transition duration-300 "
            onClick={() => {
              setClose(true);
            }}
          />

          <ul>
            {data.slice(0, 5).map((movie, index) => {
              // Image Variables >>
              const imageSize = "original";
              const imageUrl = `https://image.tmdb.org/t/p/${imageSize}${movie.poster_path}`;

              return (
                <li
                  key={index}
                  className="flex gap-2 items-center justify-between px-4 py-2 cursor-pointer transition-all duration-300
                  hover:py-4 hover:bg-black/30  border-t border-secondary  ">
                  <div className="flex flex-1 items-center gap-x-2">
                    <div className="min-w-12 w-12 h-12 shadow-sm shadow-active rounded-md overflow-hidden">
                      <Image
                        className={"w-full h-full object-cover object-center"}
                        src={imageUrl}
                        alt={movie.original_title}
                        width={100}
                        height={100}
                        priority
                      />
                    </div>
                    <p className="line-clamp-1">
                      {movie.original_title || "Untitled"}
                    </p>
                  </div>

                  <div>
                    <CardActions id={movie.id} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
