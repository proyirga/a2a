import prisma from "@/app/lib/db";
import ExternalJobsLinks from "@/app/ui/job-seeker/external-jobs";

export default async function JobsList() {
  const jobs = await prisma.job.findMany({
    include: {
      company: true,
    },
  });

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row bg-blue-100">
      {/* LEFT CONTENT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <h1 className="text-2xl font-bold">Jobs List</h1>
        <div className="flex gap-4 justify-between flex-wrap">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white shadow-md p-4 rounded-lg w-full  flex flex-col gap-2"
              >
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-gray-600">{job.company.name}</p>
                <p className="text-gray-500">{job.type}</p>
                <p className="text-green-600 font-bold">${job.salary}</p>
                <p className="text-sm text-gray-400">
                  Deadline: {new Date(job.deadline).toLocaleDateString()}
                </p>
                <button className="mt-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                  Apply Now
                </button>
              </div>
            ))
          ) : (
            <p>No jobs available.</p>
          )}
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        {/*LINKS TO EXTERNAL JOB BOARDS*/}
        <ExternalJobsLinks />
      </div>
    </div>
  );
}
