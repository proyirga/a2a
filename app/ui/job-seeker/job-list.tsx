import { CalendarIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import Link from "next/link";
import prisma from "@/app/lib/db";
import Image from "next/image";
import { format } from "date-fns";

import { ITEMS_PER_PAGE } from "@/app/lib/utils";

export default async function JobList({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const jobs = await prisma.job.findMany({
    where: {
      OR: [
        {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          company: {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
        },
      ],
    },
    include: {
      company: true,
      requirements: {
        include: {
          skills: true,
        },
      },
    },
    skip: (currentPage - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
  });

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Jobs</h2>

      {/* Job List */}
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="mt-0 grid grid-cols-1 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          {jobs.length > 0 ? (
            jobs.map((job, i) => (
              <div
                key={`job.id-${i}`}
                className="flex flex-col p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all"
              >
                <Link href={`/jobs/${job.id}`} className="flex flex-col">
                  <div className="flex justify-between flex-wrap">
                    <span className="text-lg font-semibold">{job.title}</span>
                    <div className="text-gray-600 text-xs mt-2 flex gap-1">
                      <CalendarIcon className="h-5 w-5 text-gray-500 mt-2" />
                      <div>
                        <p>
                          Posted:{" "}
                          {format(new Date(job.createdAt), "MMM d, yyyy")}
                        </p>
                        <p>
                          Ending:{" "}
                          {format(new Date(job.deadline), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="flex items-center gap-2 mt-2">
                  <Image
                    src={job.company.logo || "/company-placeholder.png"}
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
                {job.requirements.map((requirement, reqIndex) => (
                  <div
                    key={`requirement-${job.id}-${reqIndex}`}
                    className="flex flex-wrap mt-4"
                  >
                    {requirement.skills.map((skill, i) => (
                      <span
                        key={`skill-${job.id}-${reqIndex}-${i}`}
                        className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 mb-1 rounded-full px-2.5 py-0.5"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                ))}

                {/* Job Description */}
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
            <p className="text-center col-span-3">No jobs found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
