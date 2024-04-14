"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AppBar = () => {
  const session = useSession();
  const router = useRouter();
  return (
    <div>
      <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
        <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
          {session.data?.user ? (
            <div className="flex items-center justify-between w-full">
              <div className="">
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  onClick={() => signOut()}
                >
                  <span>Log Out</span>
                </Button>
              </div>
              <div className="text-sm">{session.data.user.name}</div>
            </div>
          ) : (
            <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
              <Button size="sm" variant="outline" asChild>
                <Link href="/signin">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppBar;
