"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

const Page = ({ params }: { params: { slug: string } }) => {
  const [qr, setQr] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const generate = async () => {
    if (!phone) {
      alert("NO input");
      return;
    }
    const res = await axios.post("/api/updateDYNSMS/" + params.slug, {
      name,
      phone,
      countryCode,
    });
    console.log(res);

    setName(res.data.name);
    setPhone(res.data?.phoneNumber);
    setCountryCode(res.data?.countryCode);
  };
  useEffect(() => {
    async function getQr() {
      const oqr = await axios.get("/api/getDYNSMS/" + params.slug);
      QRCode.toDataURL(oqr.data.proxyURL).then(setQr);
      setName(oqr.data?.name);
      setPhone(oqr.data?.phoneNumber);
      setCountryCode(oqr.data?.countryCode);
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
              <label className="p-2">Country Code</label>
              <input
                placeholder={`+${countryCode}`}
                onChange={(e) => setCountryCode(e.target.value)}
                className="border-solid border-2 m-2"
              />
              <label className="p-2">Phone</label>
              <input
                placeholder={phone}
                onChange={(e) => setPhone(e.target.value)}
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
