"use client";
// Next  
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import { trindingMovies } from "@/app/api/api";
import { useEffect, useState } from "react";
// 
import { ImSpinner9 } from "react-icons/im";

const imageClass = "w-full h-auto object-cover object-center";
const SwiperImageTsx = ({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority: boolean;
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={1080} // عرض الصورة
      height={400} // ارتفاع الصورة
      className={imageClass}
      priority={priority}
    />
  );
};
const textClass =
  "z-50 py-2 px-6 h-full w-full bg-black/20 backdrop-blur-sm absolute top-0 left-0 flex flex-col justify-center gap-2";
const SwiperHome = () => {
  interface Movie {
    poster_path: string;
    original_title: string;
    overview: string;
  }
  const [data, setData] = useState<Movie[]>([]);
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const response = await trindingMovies(1);
      setData(response.results?.slice(0, 4));
    };

    fetchTrendingMovies();
  }, []);

  return (
    <Swiper
      className="mySwiper w-full h-[220px] sm:h-[300px] lg:w-[65%] lg:h-[420px] rounded-lg"
      pagination={{
        dynamicBullets: true,
      }}
      spaceBetween={10}
      autoplay={{
        delay: 3500,
      }}
      loop={data.length > 1} // if data is greater than 1 will return true >>
      modules={[Pagination, Autoplay]}>
      {/* Loop in Data  >> */}
      {data.length > 1 ? (
        data.map((item: any, index: number) => {
          const imageSize = "original";
          const imageUrl = `https://image.tmdb.org/t/p/${imageSize}${item.poster_path}`;
          return (
            item.poster_path && (
              <SwiperSlide key={index} className="relative overflow-hidden">
                <div className={textClass}>
                  <h2 className=" text-2xl line-clamp-1 text-white font-semibold ">
                    {item.original_title}
                  </h2>
                  <p className="text-gray-200 line-clamp-4 sm:line-clamp-6 text-pretty w-full md:w-8/12">
                    {item.overview}
                  </p>
                </div>
                {item.poster_path === data[0].poster_path ? (
                  <SwiperImageTsx
                    src={imageUrl}
                    alt={item.title || "Movie"}
                    priority={true}
                  />
                ) : (
                  <SwiperImageTsx
                    src={imageUrl}
                    alt={item.title || "Movie"}
                    priority={false}
                  />
                )}
              </SwiperSlide>
            )
          );
        })
      ) : (
        <SwiperSlide className="relative animate-pulse">
          <div className={`${textClass} items-center `}>
            <ImSpinner9 className="animate-spin text-3xl" />
          </div>
        </SwiperSlide>
      )}
    </Swiper>
  );
};

export default SwiperHome;
