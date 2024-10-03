import {
  GlobeAltIcon,
  GlobeEuropeAfricaIcon,
} from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white pr-3`}
    >
      <GlobeEuropeAfricaIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">A2A</p>
    </div>
  );
}
