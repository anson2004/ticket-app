"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function MainNavLinks( {role}: { role?: string}) {
  const links = [
    { label: "Dashboard", href: "/", adminOnly:false },
    { label: "Tickets", href: "/tickets", adminOnly:false  },
    { label: "Users", href: "/users",adminOnly: true  },
  ];

  const currentPath = usePathname()

  return (
    <div className="flex  items-center gap-2">
    {
        links.filter( link => !link.adminOnly || role ==="ADMIN").map(({ label, href })  => (
          <Link key={label} href={href} className={`navbar-link ${currentPath === href ? 'cursor-default text-primary/70 hover:text-primary/60' : ''}`}>
            {label}
          </Link>
        ))
    }

    </div>
  );
}

export default MainNavLinks;
