import NavBar from '@/components/NavBar';
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="">
        <NavBar />
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}
