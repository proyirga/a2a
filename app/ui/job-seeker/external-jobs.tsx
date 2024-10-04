"use client";

import Image from "next/image";

// Example external job links data (you can replace this with API data)
const externalJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer - Remote",
    description:
      "Join an innovative company as a remote Senior Frontend Developer.",
    link: "https://remoteok.io/remote-jobs/123456-senior-frontend-developer",
  },
  {
    id: 2,
    title: "Remote Product Designer",
    description: "Seeking a talented product designer for a fully remote role.",
    link: "https://weworkremotely.com/remote-jobs/123456-product-designer",
  },
  {
    id: 3,
    title: "Full-Stack Developer - Work from Anywhere",
    description:
      "Global company looking for a Full-Stack Developer to work remotely.",
    link: "https://stackoverflow.com/jobs/123456-full-stack-developer-remote",
  },
  {
    id: 4,
    title: "Remote Data Scientist",
    description:
      "Opportunity for a Data Scientist to work remotely with flexible hours.",
    link: "https://remotive.io/remote-jobs/123456-data-scientist",
  },
];

const ExternalJobsLinks = () => {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Remote Job Opportunities</h1>
        <Image src="/filter.svg" alt="" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        {externalJobs.map((job) => (
          <a
            href={job.link}
            key={job.id}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-green-100 even:border-blue-100 hover:bg-gray-50 transition"
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{job.title}</h1>
              <Image
                src="/arrow-right.svg"
                alt="Go to job"
                width={20}
                height={20}
                className="cursor-pointer"
              />
            </div>
            <p className="mt-2 text-gray-400 text-sm">{job.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ExternalJobsLinks;
