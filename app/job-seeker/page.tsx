import { Card } from "@/app/ui/job-seeker/job-card";
import JobList from "@/app/ui/job-seeker/job-list";
import { lusitana } from "@/app/ui/fonts";
import Navbar from "../ui/job-seeker/navbar";
import CompaniesList from "../ui/job-seeker/company-list";
import Search from "../ui/search";
import { CreateJob } from "../ui/jobs/buttons";
import { Suspense } from "react";
import { fetchJobsPages } from "../lib/data";
import Pagination from "../ui/jobs/pagination";

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
    <div className="flex flex-col">
      {/* TOP SECTION JOB VATEGORIES*/}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          title="Software Development"
          count={2}
          category="Software Development"
        />
        <Card title="Design & UX" count={3} category="Design & UX" />
        <Card title="Marketing" count={5} category="Marketing" />
        <Card title="Sales" count={2} category="Sales" />
      </div>
      <div className="p-4 flex gap-4 flex-col md:flex-row">
        {/* LEFT SECTION JOB LIST */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          {/* SEARCH AND CREATE JOB BUTTON */}
          <div className="mt-2 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Search jobs..." />
            <CreateJob />
          </div>
          {/* JOB LIST  + PAGINATION*/}
          <div className="flex gap-4 justify-between flex-wrap min-w-[300px]">
            <Suspense
              key={query + currentPage}
              fallback={<div>Loading...</div>}
            >
              <JobList query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
              <Pagination totalPages={totalPages} />
            </div>
          </div>
        </div>
        {/* RIGHT SECTION COMPANIES LIST */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          <CompaniesList />
        </div>
      </div>
    </div>
  );
}
