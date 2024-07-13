"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const SignInPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const router = useRouter();
  return (
    <div className="bg-slate-100  h-full w-full md:flex md:items-center md:justify-center">
      <div className="bg-amber-100 text-amber-700 p-10 rounded-md ">
        <div className="mb-5">Fill up this form to get registered</div>

        <div className="grid grid-cols-2 my-2">
          <div className="">Name</div>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 my-2">
          <div className="">Username</div>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 my-2">
          <div className="">Email</div>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 my-2 mb-5">
          <div className="">Password</div>
          <input type="text" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="cursor-pointer">
          <Button
            size="sm"
            variant="outline"
            asChild
            onClick={async () => {
              const r = await axios.post("/api/signup", {
                email,
                username,
                name,
                password,
              });
              console.log(r);

              const res = await signIn("credentials", {
                email: email,
                password: password,
                redirect: false,
              });
              console.log(res);
              router.push("/");
            }}
          >
            <span>Sign Up</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
