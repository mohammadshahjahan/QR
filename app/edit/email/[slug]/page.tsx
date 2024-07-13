"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { useRouter } from "next/navigation";

const Page = ({ params }: { params: { slug: string } }) => {
  const [qr, setQr] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const generate = async () => {
    if (!email) {
      alert("NO input");
      return;
    }
    const res = await axios.post("/api/updateDYNEmail/" + params.slug, {
      name,
      email,
    });
    console.log(res);

    setName(res.data.name);
    setEmail(res.data?.goToMail);
    router.push("/");
  };
  useEffect(() => {
    async function getQr() {
      const oqr = await axios.get("/api/getDYNEmail/" + params.slug);
      QRCode.toDataURL(oqr.data.proxyURL).then(setQr);
      setName(oqr.data?.name);
      setEmail(oqr.data?.goToMail);
      console.log(oqr);
    }
    getQr();
  }, [params.slug]);
  return (
    <div className="flex justify-center items-center h-full p-5 ">
      <div className="p-5">
        <div className="flex space-x-5">
          <div className="">
            <strong>Edit your Dynamic Email QR!</strong>
            <div className="grid grid-cols-2">
              <label className="p-2">Name</label>
              <input
                placeholder={name}
                className="border-solid border-2 m-2"
                onChange={(e) => setName(e.target.value)}
              />
              <label className="p-2">URL</label>
              <input
                placeholder={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-solid border-2 m-2"
              />
            </div>
          </div>
          <div>
            <strong>Here is your QR</strong>
            <div>
              <img src={qr} />
            </div>
          </div>
        </div>
        <Button onClick={generate}>Update QR</Button>
      </div>
    </div>
  );
};

export default Page;
