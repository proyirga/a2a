import { Card } from "@/app/ui/job-seeker/job-card";
import JobList from "@/app/ui/job-seeker/job-list";
import { lusitana } from "@/app/ui/fonts";
import Navbar from "../ui/job-seeker/navbar";
import CompaniesList from "../ui/job-seeker/company-list";

export default async function Page() {
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
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <JobList />
        <CompaniesList />
      </div>
    </main>
  );
}
