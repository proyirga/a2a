import Image from "next/image";
import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
import {
  fetchApplicantJobs,
  fetchAppliedJobs,
  fetchFilteredInvoices,
} from "@/app/lib/data";
import { DeleteJob, UpdateJob } from "./buttons";

export default async function JobsTable({
  query,
}: {
  query: string;
  currentPage: number;
}) {
  const jobs = await fetchAppliedJobs(query);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Job Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Type
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Salary
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Application Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {jobs?.map((job) => (
                <tr
                  key={job.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{job.job.title}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {job.job.type}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(job.job.salary)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(job.createdAt.toLocaleDateString())}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span className="px-2 py-1 text-sm text-white bg-green-500 rounded-full">
                      {job.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateJob id={job.id} />
                      <DeleteJob id={job.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
