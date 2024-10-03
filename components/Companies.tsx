import Image from "next/image";
import Link from "next/link";

interface Company {
  id: number;
  name: string;
  logo: string;
  link: string;
}

const companies: Company[] = [
  {
    id: 1,
    name: "Company One",
    logo: "/microsoft.png",
    link: "/jobs/company-one",
  },
  {
    id: 2,
    name: "Company Two",
    logo: "/alx.svg",
    link: "/jobs/company-two",
  },
  {
    id: 3,
    name: "Company Three",
    logo: "/amazon.png",
    link: "/jobs/company-three",
  },
];

const Companies = () => {
  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {companies.map((company) => (
            <div key={company.id}>
              <Link href={company.link} className="flex flex-col items-center">
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={100}
                  height={100}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Companies;
