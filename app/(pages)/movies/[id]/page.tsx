import { getMovieById } from "@/app/api/api";
import CardActions from "@/app/components/client/CardActions";
import Title from "@/app/components/shared/Title";
import Image from "next/image";
const MoviePage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const data = await getMovieById(id);
  const movie = data;
  console.log(movie);
  const imageSize = "original";

  const imageUrl = `https://image.tmdb.org/t/p/${imageSize}${movie.poster_path}`;
  return (
    <div>
      <Title title={movie.original_title} />
      <div className=" mt-8 group flex flex-col md:flex-row mx-auto w-full  md:h-[600px]  rounded-lg overflow-hidden shadow-sm shadow-secondary ">
        <div className="w-full h-2/4 max-h-[350px] md:max-h-full md:h-full flex-1">
          <Image
            className="hover:object-top transition-all duration-300 object-cover object-center w-full h-full"
            src={imageUrl}
            alt={movie.original_title}
            width={1080}
            height={400}
            priority
          />
        </div>

        <div className="w-full h-full p-4 bg-black/30 flex-1  backdrop-blur-lg space-y-5">
          <h2 className="text-xl font-bold line-clamp-1  ">
            {movie.original_title}
          </h2>
          <p className="text-sm text-gray-50  ">{movie.overview}</p>

          <p className="text-sm text-gray-50  ">Date : {movie.release_date}</p>
          <ul>
            <li>Vote Average : {movie.vote_average} </li>
            <li>Vote Count : {movie.vote_count} </li>
            <li>Popularity : {movie.popularity} </li>
          </ul>
          <CardActions id={movie.id} />
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
