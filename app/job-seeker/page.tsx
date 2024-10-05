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
    <main>
      <div className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        <Navbar />
      </div>

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
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search jobs..." />
        <CreateJob />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense key={query + currentPage} fallback={<div>Loading...</div>}>
          <JobList query={query} currentPage={currentPage} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
        <CompaniesList />
      </div>
    </main>
  );
}
