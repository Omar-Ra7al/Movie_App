"use client";
// Next >>
import Image from "next/image";
// React >>
import { useEffect, useState } from "react";
// Redux >>
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
// Icons >>
import { getMovieById } from "@/app/api/api";
import { ImSpinner9 } from "react-icons/im";
import { MdError } from "react-icons/md";
// Componets >>
import Title from "@/app/components/shared/Title";
import CardActions from "@/app/components/client/CardActions";

import { AuthStatus } from "@/app/models/types";
const page = () => {
  const { items, loaded } = useSelector((state: RootState) => state.wishList);
  const { authStatus } = useSelector((state: RootState) => state.user);
  const [wishList, setWishList] = useState<any>([]);

  // Sumlate loader
  const cards = [];
  for (let i = 0; i < 6; i++) {
    cards.push(
      <div
        key={i}
        className="flex justify-center items-center w-full h-72 bg-black/20 overflow-hidden rounded-md shadow-sm shadow-secondary  animate-pulse  ">
        {!loaded && <ImSpinner9 className="animate-spin text-xl" />}
      </div>
    );
  }

  useEffect((): any => {
    const data = async () => {
      try {
        // Fetch all movies in parallel
        const results = await Promise.allSettled(
          items.map((id) => getMovieById(id))
        );
        setWishList(results.reverse());
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    data();
  }, [items]);

  return (
    <div className="w-full">
      <Title title="Wish List" />
      {authStatus == AuthStatus.loggedIn ? (
        <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  justify-items-center gap-x-4 gap-y-8 ">
          {!loaded
            ? cards
            : wishList.map((movie: any, index: number) => {
                const imageSize = "original";
                const imageUrl = `https://image.tmdb.org/t/p/${imageSize}${movie.value.poster_path}`;

                return (
                  <div
                    key={index}
                    className="group relative w-full h-72 rounded-md overflow-hidden shadow-sm shadow-secondary ">
                    {movie.status === "fulfilled" && (
                      <>
                        <Image
                          className="group-hover:object-bottom transition-all duration-300 object-cover object-top w-full h-full"
                          src={imageUrl}
                          alt={movie.value.original_title}
                          width={500}
                          height={300}
                          priority
                        />

                        {/* Card Detials >>  */}
                        <div className="absolute bottom-0 left-0 w-full h-2/6 p-1 px-2 dark:bg-black/30 bg-white/30  backdrop-blur-lg space-y-1 rounded-lg   rounded-b-none">
                          <h2 className="text-xl font-bold line-clamp-1  ">
                            {movie.value.original_title}
                          </h2>
                          <p className="text-sm text-gray-50 line-clamp-2  ">
                            {movie.value.overview}
                          </p>
                        </div>

                        {/* Actions >> */}
                        <div
                          className="absolute right-0 top-0 flex flex-col
                        w-fit backdrop-blur-lg dark:bg-black/30 bg-white/30 h-fit rounded-lg rounded-t-none py-2 ">
                          <CardActions id={movie.value.id} />
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
        </div>
      ) : (
        <div className="mt-8 text-lg flex gap-2 items-center ">
          <p>Ops You suppose to login at first</p>
          <MdError className="text-2xl" />
        </div>
      )}
    </div>
  );
};

export default page;
