import {
  GlobeAltIcon,
  GlobeEuropeAfricaIcon,
} from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white pr-3`}
    >
      <Image src="/logo.svg" width={50} height={50} alt="logo" />
      <p className="text-[44px]">A2A</p>
    </div>
  );
}
