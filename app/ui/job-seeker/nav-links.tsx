"use client";

import {
  DocumentDuplicateIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  HomeIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/job-seeker", icon: HomeIcon },
  { name: "Jobs", href: "/job-seeker/jobs", icon: BriefcaseIcon },
  {
    name: "Companies",
    href: "/job-seeker/companies",
    icon: BuildingOfficeIcon,
  },
  {
    name: "Applied Jobs",
    href: "/job-seeker/jobs/applied",
    icon: ClipboardDocumentCheckIcon,
  },
  {
    name: "Saved Jobs",
    href: "/job-seeker/jobs/saved",
    icon: ClipboardDocumentIcon,
  },
  { name: "Run Skill Gap Analyzer", href: "/skill-gap", icon: AcademicCapIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <a
            key={link.href}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </a>
        );
      })}
    </>
  );
}
