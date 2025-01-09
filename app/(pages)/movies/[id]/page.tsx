import { trindingMovies } from "@/app/api/api";
import CardActions from "@/app/components/client/CardActions";
import Pagination from "@/app/components/client/Pagination";
import Title from "@/app/components/shared/Title";
import Image from "next/image";
const page = async ({ params }: { params: any }) => {
  const { id } = await params;
  const data = await trindingMovies(id);
  console.log(data.total_pages);
  const card = data.results.slice(0, 12);

  const cardActions_DetailsClass =
    "absolute left-0 flex justify-between items-center transition-all duration-300 w-full backdrop-blur-lg dark:bg-black/30 bg-white/30 px-4 py-2";
  return (
    <div>
      <Title title={`Trending Movies Page/${id}`} />

      <div className="w-full mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-x-6 gap-y-8 ">
        {card.map((item: any, index: number) => {
          const imageSize = "w500";
          const imageUrl = `https://image.tmdb.org/t/p/${imageSize}${item.poster_path}`;
          return (
            <div
              key={index}
              className="group  relative max-w-full w-64 h-80 overflow-hidden transition-all duration-200 trnasform hover:-translate-y-1
        border-b-2 border-secondary rounded-3xl shadow-secondary shadow-sm">
              <Image
                className="group-hover:object-bottom transition-all duration-200 object-cover max-w-full max-h-full"
                src={imageUrl}
                alt={item.original_title}
                width={300}
                height={400}
                priority
              />
              {/* Card Actions >> */}
              <div
                className={`-top-20 group-hover:top-0 h-1/6 ${cardActions_DetailsClass}`}>
                <CardActions id={item.id} />
              </div>
              {/* Card Details >> */}
              <div
                className={`bottom-0 flex-col h-1/4 ${cardActions_DetailsClass}`}>
                <p className="text-white font-bold text-xl line-clamp-1">
                  {item.original_title}
                </p>
                <p className="text-sm dark:text-gray-400 text-black">
                  {item.release_date}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination totalPages={data.total_pages} />
    </div>
  );
};

export default page;
