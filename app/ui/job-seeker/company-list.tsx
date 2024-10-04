import { ArrowPathIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";
import prisma from "@/app/lib/db";
import ExternalJobsLinks from "./external-jobs";
export default async function CompaniesList() {
  const companies = await prisma.company.findMany({
    include: {
      jobs: true,
    },
  });
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Companies Hiring...
      </h2>
      <div className="flex grow flex-col rounded-xl bg-gray-50 p-4">
        {/* NOTE: Uncomment this code in Chapter 7 */}

        <div className="bg-white px-6">
          {companies.map((company, i) => {
            return (
              <div
                key={company.id}
                className={clsx(
                  "flex flex-row items-center justify-between py-4",
                  {
                    "border-t": i !== 0,
                  }
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={"/company-placeholder.svg"}
                    alt={`${company.name}'s logo`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {company.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {company.email}
                    </p>
                  </div>
                </div>
                <p className={` text-sm font-medium md:text-base`}>
                  {company.jobs.length} jobs
                </p>
              </div>
            );
          })}
        </div>
        <ExternalJobsLinks />
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
