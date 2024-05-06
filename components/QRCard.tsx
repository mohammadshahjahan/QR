"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";
import { Button } from "./ui/button";

interface QRCardProps {
  url: string;
  name: string;
  createdAt: string;
  type: string;
}

const QRCard: React.FC<QRCardProps> = ({ createdAt, name, url, type }) => {
  const [qr, setQr] = useState("");
  useEffect(() => {
    QRCode.toDataURL(url).then(setQr);
  }, [url]);
  return (
    <div className="flex justify-between p-5 bg-white m-2">
      <div className="flex">
        <Image src={qr} alt="no image" height={140} width={140} />
        <div>
          <div className="font-bold ml-7">{name}</div>
          <div className="grid grid-cols-2 ml-5">
            <div className="font-light text-sm m-2">{createdAt}</div>
            <div className="font-light text-sm m-2">Type: {type}</div>
          </div>
        </div>
      </div>
      <div className="">
        <Button>Actions</Button>
      </div>
    </div>
  );
};

export default QRCard;
