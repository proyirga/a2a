import prisma from "@/app/lib/db";
import ExternalJobsLinks from "@/app/ui/job-seeker/external-jobs";
import { BriefcaseIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

export default async function JobsList() {
  const jobs = await prisma.job.findMany({
    include: {
      company: true,
      requirements: {
        include: {
          skills: true,
          education: true,
        },
      },
    },
  });

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row bg-blue-100">
      {/* LEFT CONTENT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <h1 className="text-2xl font-bold">Jobs List</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-w-[300px]">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job.id}
                className="flex flex-col p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all"
              >
                <Link href={`/jobs/${job.id}`} className="flex flex-col">
                  <div className="flex justify-between flex-wrap">
                    <span className="text-lg font-semibold">{job.title}</span>
                    {/* Job Dates and Deadline */}
                    <div className="text-gray-600 text-xs mt-4">
                      <p>
                        Posted: {format(new Date(job.createdAt), "MMM d, yyyy")}
                      </p>
                      <p>
                        Deadline:{" "}
                        {format(new Date(job.deadline), "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Company Logo */}
                <div className="flex items-center gap-2 mt-2">
                  <Image
                    src={job.company.logo || "/company-placeholder.png"} // Default placeholder image
                    alt={job.company.name}
                    width={24}
                    height={24}
                  />
                  <Link
                    href={job.company.website}
                    className="text-blue-500 hover:font-semibold"
                  >
                    {job.company.name}
                  </Link>
                </div>

                {/* Skills listed horizontally */}
                {job.requirements?.map((requirement, index) => (
                  <div key={index} className="flex flex-wrap mt-4">
                    {requirement.skills?.map((skill) => (
                      <span
                        key={skill.id}
                        className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 mb-1 rounded-full px-2.5 py-0.5"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                ))}

                {/* Job Description with See More feature */}
                <p className="text-sm text-gray-500 mt-2">
                  {job.description.length > 100
                    ? job.description.slice(0, 100) + "... "
                    : job.description}
                  {job.description.length > 100 && (
                    <Link href={`/jobs/${job.id}`} className="text-blue-500">
                      See more
                    </Link>
                  )}
                </p>

                {/* Save and Apply buttons */}
                <div className="flex justify-between mt-4">
                  <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600">
                    Save
                  </button>
                  <button className="bg-green-500 text-white text-sm px-4 py-2 rounded hover:bg-green-600">
                    Apply
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3">
              No featured jobs available.
            </p>
          )}
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        {/* LINKS TO EXTERNAL JOB BOARDS */}
        <ExternalJobsLinks />
      </div>
    </div>
  );
}
