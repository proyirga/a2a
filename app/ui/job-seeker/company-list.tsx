"use client";

import { useEffect, useState } from "react";
import {
  ArrowPathIcon,
  BuildingOfficeIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";
import ExternalJobsLinks from "./external-jobs";
import Link from "next/link";

export default function CompaniesList({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const [companies, setCompanies] = useState<any[]>([]);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await fetch(
        `/api/companies?query=${query}&page=${currentPage}`
      );
      const data = await res.json();
      setCompanies(data);
    };

    fetchCompanies();
  }, [query, currentPage]);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);

    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Companies Hiring...
      </h2>
      <div className="flex grow flex-col rounded-xl bg-gray-50 p-4">
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
                      {company.name} (
                      <span className={` text-xs`}>
                        {company.jobs.length} jobs
                      </span>
                      )
                    </p>
                    <Link
                      href={company.website}
                      target="_blank"
                      className="text-sm text-gray-500 truncate"
                    >
                      {company.website}
                    </Link>
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <p className="truncate hidden text-sm text-gray-500 sm:block">
                      {company.email}
                    </p>
                    <button
                      onClick={() => handleCopy(company.email, "email")}
                      className="text-blue-500 text-sm"
                    >
                      {copiedField === "email" ? (
                        "Copied!"
                      ) : (
                        <ClipboardDocumentIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center space-x-2 mt-2">
                    <span>{company.phone}</span>
                    <button
                      onClick={() => handleCopy(company.phone, "phone")}
                      className="text-blue-500 text-sm"
                    >
                      {copiedField === "phone" ? (
                        "Copied!"
                      ) : (
                        <ClipboardDocumentIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
