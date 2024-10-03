import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">About Us</h3>
            <p className="text-sm">
              We are dedicated to connecting talented professionals with remote
              job opportunities.
            </p>
          </div>

          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link href="/about" className="hover:text-gray-300">
              About
            </Link>
            <Link href="/contact" className="hover:text-gray-300">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-gray-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-300">
              Terms of Service
            </Link>
          </div>

          <div className="flex space-x-4">
            <Link
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/facebook.png" alt="" width="20" height="20" />
            </Link>
            <Link
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/twitter.png" alt="" width="20" height="20" />
            </Link>
            <Link
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/linkedin.svg" alt="" width="20" height="20" />
            </Link>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} a2a. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
