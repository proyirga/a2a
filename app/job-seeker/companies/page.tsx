import { fetchJobsPages } from "@/app/lib/data";
import CompaniesList from "@/app/ui/job-seeker/company-list";
import { Card } from "@/app/ui/job-seeker/job-card";
import JobList from "@/app/ui/job-seeker/job-list";
import { CreateJob } from "@/app/ui/jobs/buttons";
import Pagination from "@/app/ui/jobs/pagination";
import Search from "@/app/ui/search";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchJobsPages(query);
  return (
    <div className="flex gap-4 justify-between flex-wrap min-w-[300px]">
      <div className="mt-2 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search jobs..." />
      </div>
      <Suspense key={query + currentPage} fallback={<div>Loading...</div>}>
        <CompaniesList query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
