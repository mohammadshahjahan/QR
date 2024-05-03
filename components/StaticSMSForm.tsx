"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import QRCode from "qrcode";

const StaticSMSForm = () => {
  const [qr, setQr] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const generate = () => {
    if (!phone) {
      alert("NO input");
      return;
    }
    QRCode.toDataURL(`sms:${countryCode}${phone}`).then(setQr);
  };
  return (
    <div className="flex justify-center items-center h-full p-5 ">
      <div className="p-5">
        <div className="flex space-x-5">
          <div className="">
            <strong>Generate your Static SMS QR!</strong>
            <div className="grid grid-cols-2">
              <label className="p-2">Name</label>
              <input placeholder="" className="border-solid border-2 m-2" />
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

export default StaticSMSForm;
