"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import QRCode from "qrcode";
import axios from "axios";
import { useSession } from "next-auth/react";

const StaticEmailForm = () => {
  const session = useSession();
  const [qr, setQr] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const generate = async () => {
    if (!email) {
      alert("NO input");
      return;
    }
    QRCode.toDataURL(`mailto:${email}`).then(setQr);
    const r = await axios.post("/api/staticemail", {
      goToMail: email,
      name,
      email: session.data?.user?.email,
    });
    console.log(r);
  };
  return (
    <div className="flex justify-center items-center h-full p-5 ">
      <div className="p-5">
        <div className="flex space-x-5">
          <div className="">
            <strong>Generate your Static Email QR!</strong>
            <div className="grid grid-cols-2">
              <label className="p-2">Name</label>
              <input
                placeholder=""
                className="border-solid border-2 m-2"
                onChange={(e) => setName(e.target.value)}
              />
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
