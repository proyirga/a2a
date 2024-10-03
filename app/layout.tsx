import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";

export const Metadata = {
  title: "A2A",
  description: "A2A is a job board for remote jobs in Africa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
