"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import QRCode from "qrcode";
import { useSession } from "next-auth/react";
import axios from "axios";

const DynamicSMSForm = () => {
  const session = useSession();
  const [qr, setQr] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const generate = async () => {
    if (!phone) {
      alert("NO input");
      return;
    }

    
    const r = await axios.post("/api/dynamicsms", {
      countryCode,
      phoneNumber: phone,
      name,
      email: session.data?.user?.email,
    });
    QRCode.toDataURL(r.data.proxyURL).then(setQr);
    console.log(r);
  };
  return (
    <div className="flex justify-center items-center h-full p-5 ">
      <div className="p-5">
        <div className="flex space-x-5">
          <div className="">
            <strong>Generate your Dynamic SMS QR!</strong>
            <div className="grid grid-cols-2">
              <label className="p-2">Name</label>
              <input
                placeholder=""
                className="border-solid border-2 m-2"
                onChange={(e) => setName(e.target.value)}
              />
              <label className="p-2">Country Code</label>
              <input
                onChange={(e) => setCountryCode(e.target.value)}
                className="border-solid border-2 m-2"
              />
              <label className="p-2">Phone</label>
              <input
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
        <Button onClick={generate}>Generate QR</Button>
      </div>
    </div>
  );
};

export default DynamicSMSForm;
