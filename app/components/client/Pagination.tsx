"use client";
import { useRouter } from "next/navigation";
const Pagination = (totalPages: any) => {
  const router = useRouter();
  console.log(totalPages);
  return (
    <div className="flex gap-4">
      <button onClick={() => router.push("/movies/")}>prev</button>
      <button onClick={() => router.push("/movies/1")}>1</button>
      <button onClick={() => router.push("/movies/2")}>2</button>
      <button onClick={() => router.push("/movies/3")}>3</button>
      <button onClick={() => router.push("/movies/")}>next</button>
    </div>
  );
};

export default Pagination;
