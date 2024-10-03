import {
  CodeBracketIcon,
  PencilSquareIcon,
  MegaphoneIcon,
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
  MicrophoneIcon,
} from "@heroicons/react/24/outline";
import Logo from "@/app/ui/logo";
import Link from "next/link";
import { lusitana } from "./ui/fonts";
import MobileNav from "@/components/MobileNav";
import Companies from "@/components/Companies";
import PopularJobs from "@/components/Jobs";
import RecruitersSection from "@/components/Recruiter";
import Footer from "@/components/Footer";

export default function LandingPage() {
  const jobCategories = [
    {
      name: "Software Development",
      link: "/jobs/software-development",
      icon: CodeBracketIcon,
    },
    { name: "Design & UX", link: "/jobs/design-ux", icon: PencilSquareIcon },
    { name: "Marketing", link: "/jobs/marketing", icon: MegaphoneIcon },
    { name: "Sales", link: "/jobs/sales", icon: ChartBarIcon },
    {
      name: "Customer Support",
      link: "/jobs/customer-support",
      icon: MicrophoneIcon,
    },
    {
      name: "Product Management",
      link: "/jobs/product-management",
      icon: ClipboardDocumentCheckIcon,
    },
    {
      name: "Finance & Accounting",
      link: "/jobs/finance-accounting",
      icon: CurrencyDollarIcon,
    },
    {
      name: "Human Resources",
      link: "/jobs/human-resources",
      icon: UserGroupIcon,
    },
  ];

  return (
    <main className="flex min-h-screen flex-col  bg-gray-100">
      {/* Header and Navigation */}
      <header className="flex h-20 items-center justify-between bg-blue-500 p-4">
        <div className="flex items-center">
          <Logo />
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-white text-lg">
          <Link href="/jobs" className="hover:text-gray-200">
            Find Job
          </Link>
          <Link href="/talents" className="hover:text-gray-200">
            Find Talent
          </Link>

          <Link href="/register" className="hover:text-gray-200">
            Register
          </Link>
          <Link href="/login" className="hover:text-gray-200">
            Login
          </Link>
        </nav>
        {/* Mobile Navigation */}
        <MobileNav />
        {/* Search Input (Visible on Desktop) */}
        <div className="hidden md:block relative w-full max-w-xs md:max-w-sm">
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-full pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
        </div>
      </header>

      {/* Hero Section */}
      <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start justify-center bg-gray-50 px-6 py-8 rounded-lg md:w-2/5 md:px-16">
          <h1
            className={`${lusitana.className} text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center md:text-left`}
          >
            Welcome to <span className="text-blue-600">Opportunity Corner</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6 text-center md:text-left">
            Just a click away from landing{" "}
            <a href="" className="text-blue-500">
              Your Dream Remote Job
            </a>
          </p>
          <Link
            href="/login"
            className="flex items-center gap-4 rounded-lg bg-blue-600 px-6 py-3 text-white text-lg hover:bg-blue-500 transition-all"
          >
            <span>Get Started</span>
            <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>

        {/* Job Categories List */}
        <div className="flex flex-col items-center md:w-3/5 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            Explore Top Job Categories
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {jobCategories.map((category, index) => (
              <li key={index} className="w-full">
                <Link href={category.link}>
                  <div className="flex items-center p-4 bg-gray-100 rounded-lg hover:bg-blue-100 transition-all">
                    <category.icon className="w-6 h-6 text-blue-600" />
                    <span className="text-lg text-gray-700 ml-3">
                      {category.name}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Companies Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold text-center">Companies Are Hiring</h2>
        <Companies />
      </div>
      <div>
        <PopularJobs />
      </div>
      <div>
        <RecruitersSection />
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
}
