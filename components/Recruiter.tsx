import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

interface Recruiter {
  id: number;
  name: string;
  company: string;
  photo: string;
  link: string;
  rating: number; // Add rating property
  social: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}

const recruiters: Recruiter[] = [
  {
    id: 1,
    name: "Alice Johnson",
    company: "Tech Recruiters Inc.",
    photo: "/r3.jpg",
    link: "/recruiters/alice",
    rating: 4.5,
    social: {
      facebook: "https://www.facebook.com/alicejohnson",
      twitter: "https://twitter.com/alicejohnson",
      linkedin: "https://www.linkedin.com/in/alicejohnson/",
    },
  },
  {
    id: 2,
    name: "Bob Smith",
    company: "Innovative Recruiting",
    photo: "/r2.jpg",
    link: "/recruiters/bob",
    rating: 4.0,
    social: {
      facebook: "https://www.facebook.com/bobsmith",
      twitter: "https://twitter.com/bobsmith",
      linkedin: "https://www.linkedin.com/in/bobsmith/",
    },
  },
  {
    id: 3,
    name: "Charlie Brown",
    company: "Talent Seekers",
    photo: "/r1.jpg",
    link: "/recruiters/charlie",
    rating: 5.0,
    social: {
      facebook: "https://www.facebook.com/charliebrown",
      twitter: "https://twitter.com/charliebrown",
      linkedin: "https://www.linkedin.com/in/charliebrown/",
    },
  },
];

const RecruitersSection = () => {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center ">
          <div className="flex">
            <span className="text-2xl font-semibold">
              Looking for talent? Meet one of our professional recruiters
            </span>
            <ArrowDownIcon className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <Link
              href="/login"
              className="flex items-center gap-4 rounded-lg bg-blue-600 px-6 py-3 text-white text-lg hover:bg-blue-500 transition-all"
            >
              <span>Post a Job</span>
              <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recruiters.map((recruiter) => (
            <div
              key={recruiter.id}
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow"
            >
              <Link href={recruiter.link}>
                <div className="flex justify-between items-center gap-2">
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold">
                      {recruiter.name}
                    </span>
                    <p className="text-gray-600">{recruiter.company}</p>
                    {/* Rating Display */}
                    <div className="flex items-center mt-1">
                      {Array.from({ length: 5 }, (_, index) => (
                        <span
                          key={index}
                          className={`${
                            index < Math.floor(recruiter.rating)
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                      <span className="ml-2 text-gray-600">
                        {recruiter.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <Image
                    src={recruiter.photo}
                    alt={recruiter.name}
                    width={80}
                    height={80}
                    className="rounded-full mb-4"
                  />
                </div>
              </Link>
              {/* Social media links */}
              <div className="flex space-x-3 mt-4">
                {recruiter.social.facebook && (
                  <Link
                    href={recruiter.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/facebook.png"
                      alt="Facebook"
                      width={20}
                      height={20}
                      className="hover:opacity-70 transition-opacity"
                    />
                  </Link>
                )}
                {recruiter.social.twitter && (
                  <Link
                    href={recruiter.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/twitter.png"
                      alt="Twitter"
                      width={20}
                      height={20}
                      className="hover:opacity-70 transition-opacity"
                    />
                  </Link>
                )}
                {recruiter.social.linkedin && (
                  <Link
                    href={recruiter.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/linkedin.svg"
                      alt="LinkedIn"
                      width={20}
                      height={20}
                      className="hover:opacity-70 transition-opacity"
                    />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecruitersSection;
