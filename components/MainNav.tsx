import Link from "next/link";
import React from "react";
import ToggleMode from "./ToggleMode";
import MainNavLinks from "./MainNavLinks";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

async function MainNav() {
  const session = await getServerSession(options);
  console.log(session)
  return (
    <div className="flex justify-between items-center p-4">
      <MainNavLinks role={session?.user.role}/>


      <div className="flex  items-center gap-2">
        {session ? (
          <Link href="/api/auth/signout?callbackUrl=/">logout</Link>
        ) : (
          <Link href="/api/auth/signin">Signin</Link>
        )}

        <ToggleMode />
      </div>
    </div>
  );
}

export default MainNav;
