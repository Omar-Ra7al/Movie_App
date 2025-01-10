import { trindingMovies } from "@/app/api/api";
import Title from "@/app/components/shared/Title";
import TrindingCard from "../../../components/server/TrendingCard";
const page = async ({ params }: { params: any }) => {
  const { pageNumber } = await params;
  const data = await trindingMovies(pageNumber);
  const card = data.results;
  return (
    <div className="w-full">
      <Title title={`Trending Movies Page/${pageNumber}`} />
      <TrindingCard card={card} totalPages={data.total_pages} />
    </div>
  );
};

export default page;
