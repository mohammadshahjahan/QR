"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

const Page = ({ params }: { params: { slug: string } }) => {
  const [qr, setQr] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const generate = async () => {
    if (!url) {
      alert("NO input");
      return;
    }
    const res = await axios.post("/api/updateDYNURL/" + params.slug, {
      name,
      url,
    });
    console.log(res);

    setName(res.data.name);
    setUrl(res.data?.goToURL);
  };
  useEffect(() => {
    async function getQr() {
      const oqr = await axios.get("/api/getDYNURL/" + params.slug);
      QRCode.toDataURL(oqr.data.proxyURL).then(setQr);
      setName(oqr.data?.name);
      setUrl(oqr.data?.goToURL);
      console.log(oqr);
    }
    getQr();
  }, [params.slug]);
  return (
    <div className="flex justify-center items-center h-full p-5 ">
      <div className="p-5">
        <div className="flex space-x-5">
          <div className="">
            <strong>Generate your Dynamic URL QR!</strong>
            <div className="grid grid-cols-2">
              <label className="p-2">Name</label>
              <input
                placeholder={name}
                className="border-solid border-2 m-2"
                onChange={(e) => setName(e.target.value)}
              />
              <label className="p-2">URL</label>
              <input
                placeholder={url}
                onChange={(e) => setUrl(e.target.value)}
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
