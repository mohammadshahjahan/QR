"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

const SignInPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  return (
    <div className=" bg-slate-100  h-full w-full md:flex md:items-center md:justify-center">
      <div className="bg-amber-100 text-amber-700 p-10 rounded-md ">
        <div className="mb-5">Fill your Credentials to log in</div>
        <div className="flex space-x-4 mb-3">
          <div className="">Username</div>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="abc@email.com"
          />
        </div>
        <div className="flex space-x-4 mb-5">
          <div className="">Password</div>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </div>
        <div className="">
          <Button
            size="sm"
            variant="outline"
            asChild
            onClick={async () => {
              const res = await signIn("credentials", {
                email: email,
                password: password,
                redirect: false,
              });
              console.log(res);
              router.push("/");
            }}
          >
            <span>Sign In</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
