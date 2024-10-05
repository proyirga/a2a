import {
  UserGroupIcon,
  CodeBracketIcon,
  MegaphoneIcon,
  PencilSquareIcon,
  ChartBarIcon,
  MicrophoneIcon,
  ClipboardDocumentCheckIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const iconMap = {
  "Software Development": CodeBracketIcon,
  "Design & UX": PencilSquareIcon,
  Marketing: MegaphoneIcon,
  Sales: ChartBarIcon,
  "Customer Support": MicrophoneIcon,
  "Product Management": ClipboardDocumentCheckIcon,
  "Finance & Accounting": CurrencyDollarIcon,
  "Human Resources": UserGroupIcon,
};

export default async function CardWrapper() {
  return (
    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}

      {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      /> */}
    </>
  );
}

export function Card({
  title,
  count,
  category,
}: {
  title: string;
  count: number | string;
  query?: string;
  currentPage?: number;
  category:
    | "Software Development"
    | "Design & UX"
    | "Marketing"
    | "Sales"
    | "Customer Support"
    | "Product Management"
    | "Finance & Accounting"
    | "Human Resources";
}) {
  const Icon = iconMap[category];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <Link href={`/job-seeker/jobs?category=${category}`}>
        <div className="flex p-4">
          {Icon ? <Icon className="h-8 w-8 text-gray-700" /> : null}
          <h3 className="ml-2 text-xl font-medium">
            {title} ({count})
          </h3>
        </div>
      </Link>
    </div>
  );
}
