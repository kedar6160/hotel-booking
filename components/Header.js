"use client";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ✅ Import usePathname
import { useSession, signOut } from "next-auth/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Header() {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-blue-600 shadow-md">
      <nav className="flex items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="flex items-center gap-2">
            <img
              alt="Hotel Booking Logo"
              src="https://img.icons8.com/?size=100&id=47575&format=png&color=000000"
              className="h-8 w-auto"
            />
            <span className="text-white text-2xl font-bold">Hotel Booking</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2.5 text-white hover:bg-blue-700 rounded-md transition"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          {status === "authenticated" ? (
            <>
              <NavLink
                href="/hotels"
                text="Book Hotels"
                active={pathname === "/hotels"}
              />
              <NavLink
                href="/profile"
                text="Profile"
                active={pathname === "/profile"}
              />
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm font-semibold text-white hover:text-red-300 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                href="/auth/login"
                text="Login"
                active={pathname === "/auth/login"}
              />
              <NavLink
                href="/auth/register"
                text="Signup"
                active={pathname === "/auth/register"}
              />
            </>
          )}
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      <div
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <img
                alt="Hotel Booking Logo"
                src="https://img.icons8.com/?size=100&id=47575&format=png&color=000000"
                className="h-8 w-auto"
              />
              <span className="text-lg font-bold text-gray-900">
                Hotel Booking
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md text-gray-700 hover:text-gray-900 transition"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 space-y-4">
            {status === "authenticated" ? (
              <>
                <NavLink
                  href="/hotels"
                  text="Book Hotels"
                  mobile
                  active={pathname === "/hotels"}
                />
                <NavLink
                  href="/profile"
                  text="Profile"
                  mobile
                  active={pathname === "/profile"}
                />
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="block w-full text-left text-base font-semibold text-red-600 hover:bg-gray-100 rounded-lg px-4 py-2 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  href="/auth/login"
                  text="Login"
                  mobile
                  active={pathname === "/auth/login"}
                />
                <NavLink
                  href="/auth/register"
                  text="Signup"
                  mobile
                  active={pathname === "/auth/register"}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, text, active, mobile }) {
  return (
    <Link
      href={href}
      className={`text-sm font-semibold transition ${
        mobile
          ? "block w-full text-gray-900 hover:bg-gray-100 rounded-lg px-4 py-2"
          : "text-white hover:text-gray-300"
      } ${active ? "underline underline-offset-4" : ""}`}
    >
      {text}
    </Link>
  );
}
