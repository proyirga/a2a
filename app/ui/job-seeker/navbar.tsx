import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const loggedInUser = "Yirga Mulaw";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-blue-500 text-white text-lg">
      {/* SEARCH INPUT */}
      <div className="hidden md:block relative w-full max-w-xs md:max-w-sm">
        <input
          type="text"
          placeholder="Search jobs..."
          className="w-full pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
      </div>
      {/* PROFILE */}
      <div className="flex items-center gap-6 justify-end w-full">
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <Image src="/notification.svg" alt="" width={20} height={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full">
            3{" "}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">Yirga Mulaw</span>
          <span className="text-[10px] text-right text-gray-500">
            Software Engineer
          </span>
        </div>
        <Image
          src="/avatar.svg"
          alt={loggedInUser[0]}
          className="rounded-full"
          width={20}
          height={20}
        />
        <div className="md:hidden"></div>
      </div>
    </div>
  );
};

export default Navbar;
