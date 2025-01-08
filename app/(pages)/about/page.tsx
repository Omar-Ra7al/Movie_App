import Title from "@/app/components/shared/Title";
import React from "react";
import { FaRunning, FaHeart, FaGlobe } from "react-icons/fa";
import { FaFilm } from "react-icons/fa6";
import { GiPopcorn, GiTeamIdea } from "react-icons/gi";

const AboutUsPage = () => {
  return (
    <div className="font-sans ">
      <Title title="About Us" />
      <div className="flex justify-around flex-wrap gap-4 gap-y-6 mt-8">
        <p className="text-lg leading-relaxed">
          Welcome to <strong>MovieMate</strong>, your ultimate destination for
          exploring and enjoying the world of cinema! Our mission is to bring
          movie enthusiasts together by offering a platform that celebrates
          films, directors, and stories from across the globe. Whether you're a
          casual viewer or a hardcore cinephile, we've got something for
          everyone.
        </p>
        <div className="text-center">
          <FaFilm size={40} className="text-orange-500 mx-auto" />
          <h3 className="text-xl font-semibold mt-2">Explore Movies</h3>
          <p>Dive into a vast collection of movies from all genres.</p>
        </div>
        <div className="text-center">
          <FaHeart size={40} className="text-red-500 mx-auto" />
          <h3 className="text-xl font-semibold mt-2">Curated Favorites</h3>
          <p>Discover handpicked recommendations tailored to you.</p>
        </div>
        <div className="text-center">
          <GiPopcorn size={40} className="text-yellow-500 mx-auto" />
          <h3 className="text-xl font-semibold mt-2">Cinema Community</h3>
          <p>Join a vibrant community of movie lovers.</p>
        </div>
        <div className="text-center">
          <FaGlobe size={40} className="text-blue-500 mx-auto" />
          <h3 className="text-xl font-semibold mt-2">Global Stories</h3>
          <p>Experience films from cultures around the world.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
