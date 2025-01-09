// Components >>
import Title from "../shared/Title";
import TrindingCard from "./TrendingCard";
import ProfileRender from "../client/ProfileRender";
import SwiperHome from "../client/Swiper";
import Logo from "../shared/Logo";
import Search from "../client/Search";
import { trindingMovies } from "@/app/api/api";
import Pagination from "../client/Pagination";

const Dashboard = async () => {
  const treindingMoviesData = await trindingMovies(1);
  const cardTrending = treindingMoviesData.results.slice(0, 12);
  return (
    <div className="space-y-8">
      {/* Login Signup user Profile */}
      <div className="flex justify-between gap-4 sm:flex-row-reverse ">
        <div className="block sm:hidden">
          <Logo />
        </div>
        <ProfileRender />
        <div className="hidden sm:block">
          <Title title="Dashboard" />
        </div>
      </div>
      {/* //>> */}

      {/* Swiper && sybscribtion */}
      <div className="flex justify-between flex-wrap gap-y-4 gap-x-8 ">
        <SwiperHome />
        <div className="card-sales flex-1 hidden lg:block bg-secondary rounded-md p-4 space-y-4">
          <div>
            <h2 className="text-4xl font-bold text-white">50% Off</h2>
            <p className="text-gray-50">on an annual subscription </p>
          </div>
          <p className="text-2xl font-bold text-white">Are you ready ?</p>
          <ul className="space-y-2 text-white">
            <li>60,000 Movie</li>
            <li>20,000 TV Shows</li>
            <li>60,000 Movie</li>
            <li>Movies and Tv Shows without ads</li>
            <li>Access for the whole family 5 devices</li>
          </ul>
          <button className="btn rounded-lg w-full bg-main p-2 text-white ">
            Subscribe Now
          </button>
        </div>
      </div>
      {/*  //>> */}

      <Search />
      <TrindingCard />

    </div>
  );
};

export default Dashboard;
