'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Home from '@/app/icons/home.svg';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem('auth');
  };

  return (
    <nav className="mt-5 mx-3 p-6 rounded-lg shadow-md border border-gray-100">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">Prueba Tecnica</div>

        <div className="flex">
          <button
            className="block lg:hidden focus:outline-none"
            onClick={toggleDropdown}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div
            className="relative mt-4 lg:inline-block lg:mt-0"
            ref={dropdownRef}
          >
            <div className="hidden lg:flex lg:items-center">
              <Link
                href="/meals"
                className="flex items-center justify-center gap-1 text-center px-4 py-2  font-semibold"
              >
                <Image src={Home} width={18} height={18} alt="Home icon" />
                Home
              </Link>
              <Link
                href="/"
                onClick={handleLogout}
                className="block px-5 py-4 bg-[#212121] rounded-lg shadow-lg text-sm font-semibold text-white"
              >
                Log Out
              </Link>
            </div>
            <div
              className={`${
                isOpen ? 'block' : 'hidden'
              } absolute mt-2 bg-white text-gray-800 rounded-lg shadow-lg w-32 z-10 right-0 lg:right-auto lg:left-0`}
            >
              <Link
                href="/meals"
                className="block px-4 py-2 rounded-t-md hover:bg-gray-200"
              >
                Home
              </Link>
              <Link
                href="/"
                onClick={handleLogout}
                className="block px-4 py-2 rounded-b-md hover:bg-gray-200"
              >
                Log Out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
