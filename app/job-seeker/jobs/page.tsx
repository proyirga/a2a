import ExternalJobsLinks from "@/app/ui/job-seeker/external-jobs";
import React from "react";

const JobsPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row bg-blue-100">
      {/* LEFT CONTENT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        JOBS LISTING HERE
        <div className="flex gap-4 justify-between flex-wrap">
          JOB LIST CARDS
        </div>
      </div>
      {/* RIGHT CONTENT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        {/*LINKS TO EXTERNAL JOB BOARDS*/}
        <ExternalJobsLinks />
      </div>
    </div>
  );
};

export default JobsPage;
