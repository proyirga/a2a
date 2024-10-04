import prisma from "@/app/lib/db";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

{
  /*interface Job {
  id: number;
  title: string;
  skills: string[];
  logo: string;
  link: string;
}

const jobs: Job[] = [
  {
    id: 1,
    title: "Software Engineer",
    skills: ["JavaScript", "React", "Node.js"],
    logo: "/logos/company-one.png",
    link: "/jobs/software-engineer",
  },
  {
    id: 2,
    title: "Product Manager",
    skills: ["Agile", "UX Design", "Communication"],
    logo: "/logos/company-two.png",
    link: "/jobs/product-manager",
  },
  {
    id: 3,
    title: "UX Designer",
    skills: ["Figma", "Prototyping", "User Research"],
    logo: "/logos/company-three.png",
    link: "/jobs/ux-designer",
  },
  {
    id: 4,
    title: "Data Scientist",
    skills: ["Python", "Machine Learning", "Statistics"],
    logo: "/logos/company-four.png",
    link: "/jobs/data-scientist",
  },
];*/
}

export default async function FeaturedJobs() {
  const featuredJobs = await prisma.job.findMany({
    where: {
      featured: true,
    },
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
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6">Featured Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredJobs.length > 0 ? (
            featuredJobs.map((job) => (
              <div
                key={job.id}
                className="flex flex-col p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all"
              >
                <Link href={`/jobs/${job.id}`} className="flex flex-col">
                  <div className="flex justify-between items-center ">
                    <span className="text-lg font-semibold">{job.title}</span>
                    <BriefcaseIcon className="w-6 h-6 text-blue-500" />
                  </div>
                  <p className="text-gray-600 mt-2">{job.company.name}</p>

                  {/* Skills listed horizontally */}

                  {job.requirements?.map((skill, index) => (
                    <div key={index} className="flex flex-wrap mt-4">
                      {skill.skills?.map((s) => (
                        <span
                          key={s.id}
                          className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 mb-1 rounded-full px-2.5 py-0.5"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  ))}
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3">
              No featured jobs available.
            </p>
          )}
        </div>
        {/* More button */}
        <div className="mt-6 text-center">
          <Link
            href="/jobs" // Link to all job listings
            className="inline-block rounded-lg bg-blue-500 px-4 py-2 text-white font-medium transition-colors hover:bg-blue-400"
          >
            List All Jobs
          </Link>
        </div>
      </div>
    </section>
  );
}
