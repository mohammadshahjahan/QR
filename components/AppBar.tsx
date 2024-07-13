"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";
import axios from "axios";
import useCurrentUserID from "@/libs/store/useCurrentUserID";

const AppBar = () => {
  const session = useSession();
  const router = useRouter();
  const { setUserId } = useCurrentUserID();

  useEffect(() => {
    async function getUserID() {
      const r = await axios.post("/api/getId", {
        email: session.data?.user?.email,
      });
      console.log(r.data);
      setUserId(r.data);
    }
    if (session.data?.user?.email) {
      getUserID();
    }
  }, [session.data?.user?.email, setUserId]);

  return (
    <div>
      <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
        <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
          {session.data?.user ? (
            <div className="flex items-center justify-between w-full">
              {/* add image */}
              <Image
                src="/logo.svg"
                alt="Logo"
                height={30}
                width={30}
                onClick={() => router.push("/")}
              />
              <div className=" flex space-x-3">
                <div className="cursor-pointer">
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    onClick={() => signOut()}
                  >
                    <span>Log Out</span>
                  </Button>
                </div>
                <div className="text-sm cursor-pointer">
                  <Button
                    size="sm"
                    asChild
                    onClick={() => router.push("/dashboard")}
                  >
                    <span>DashBoard</span>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              {/* add image */}
              <Image src="/logo.svg" alt="Logo" height={30} width={30} />
              <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                <Button size="sm" variant="outline" asChild>
                  <Link href="/signin">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppBar;
