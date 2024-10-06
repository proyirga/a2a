import Form from "@/app/ui/jobs/create-form";
import Breadcrumbs from "@/app/ui/jobs/breadcrumbs";
import { fetchCompanies, fetchCustomers } from "@/app/lib/data";
import prisma from "@/app/lib/db";

export default async function Page() {
  const companies = await prisma.company.findMany();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Jobs", href: "/company/jobs" },
          {
            label: "Post Jobs",
            href: "/company/jobs/create",
            active: true,
          },
        ]}
      />
      <Form companies={companies} />
    </main>
  );
}
