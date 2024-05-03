"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import QRCode from "qrcode";

const StaticEmailForm = () => {
  const [qr, setQr] = useState("");
  const [email, setEmail] = useState("");
  const generate = () => {
    if (!email) {
      alert("NO input");
      return;
    }
    QRCode.toDataURL(`mailto:${email}`).then(setQr);
  };
  return (
    <div className="flex justify-center items-center h-full p-5 ">
      <div className="p-5">
        <div className="flex space-x-5">
          <div className="">
            <strong>Generate your Static Email QR!</strong>
            <div className="grid grid-cols-2">
              <label className="p-2">Name</label>
              <input placeholder="" className="border-solid border-2 m-2" />
              <label className="p-2">Email</label>
              <input
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
        <Button onClick={generate}>Generate QR</Button>
      </div>
    </div>
  );
};

export default StaticEmailForm;
