"use client";
// Next js >>
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
// Componetns >>
import Button from "../shared/Button";

import { useState } from "react";

const Pagination = ({ totalPages }: any) => {
  const router = useRouter();

  const params = useParams();
  const { pageNumber } = params;
  const currentPage = Number(pageNumber) || 1;

  const [page, setPage] = useState({
    start: currentPage - 1,
    end: currentPage + 3,
  });

  let pagesTsx = [];
  for (let i = 1; i < page.end; i++) {
    pagesTsx.push(
      <Button
        key={i}
        type={"button"}
        text={`${i}`}
        className={`${currentPage == i ? "text-active" : ""}`}
        onClick={() => {
          setPage({ start: i - 1, end: i + 3 });
          router.push(`/movies/${i}`);
        }}
      />
    );
  }

  return (
    <div className="w-full mt-8 flex items-center justify-center gap-2 font-bold">
      {page.start > 0 && (
        <Button
          type={"button"}
          text={`prev`}
          onClick={() => {
            setPage({ start: page.start - 1, end: page.start + 3 });
            router.push(`/movies/${page.start}`);
          }}
        />
      )}
      {pagesTsx.slice(page.start, page.end)}
      <p className="space-x-2">
        <span>/</span>
        <span className="text-active">{totalPages}</span>
      </p>
    </div>
  );
};

export default Pagination;
