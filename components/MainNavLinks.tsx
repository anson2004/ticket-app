"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function MainNavLinks() {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Tickets", href: "/tickets" },
    { label: "Users", href: "/users" },
  ];

  const currentPath = usePathname()

  return (
    <div className="flex  items-center gap-2">
    {
        links.map(({ label, href })  => (
          <Link key={label} href={href} className={`navbar-link ${currentPath === href ? 'cursor-default text-primary/70 hover:text-primary/60' : ''}`}>
            {label}
          </Link>
        ))
    }

    </div>
  );
}

export default MainNavLinks;
