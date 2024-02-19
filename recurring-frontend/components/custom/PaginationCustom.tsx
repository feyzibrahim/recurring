"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function PaginationCustom({
  rowLength,
  rowsPerPage,
}: {
  rowLength: number;
  rowsPerPage: number;
}) {
  const initialPagesToShow = 3;

  const router = useRouter();
  const pathName = usePathname();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const calculatedTotalPages = Math.ceil(rowLength / rowsPerPage);
    setTotalPages(calculatedTotalPages);
    // If the current page exceeds the total pages, reset it to the last page
    if (page > calculatedTotalPages) {
      setPage(calculatedTotalPages);
    }
  }, [rowLength, rowsPerPage]);

  const handleClick = (type: "inc" | "decr") => {
    const newPage = type === "inc" ? page + 1 : page - 1;
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      const queryParams = new URLSearchParams();
      if (newPage === 1) {
        queryParams.delete("page");
      } else {
        queryParams.set("page", newPage.toString());
      }
      router.push(`${pathName}?${queryParams.toString()}`);
    }
  };

  const fixedNum = (num: number) => {
    setPage(num);
    const queryParams = new URLSearchParams();
    if (num === 1) {
      queryParams.delete("page");
    } else {
      queryParams.set("page", num.toString());
    }
    router.push(`${pathName}?${queryParams.toString()}`);
  };

  const renderPageLinks = () => {
    const pages = [];
    const startPage = Math.max(
      Math.min(page, totalPages - initialPagesToShow + 1),
      1
    );
    const endPage = Math.min(startPage + initialPagesToShow - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink isActive={page === i} onClick={() => fixedNum(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (startPage > 1) {
      pages.unshift(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      pages.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => handleClick("decr")} />
        </PaginationItem>
        {renderPageLinks()}
        <PaginationItem>
          <PaginationNext onClick={() => handleClick("inc")} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
