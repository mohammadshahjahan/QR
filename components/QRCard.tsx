"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface QRCardProps {
  url: string;
  name: string;
  createdAt: string;
  type: string;
  dynamic?: boolean;
  id: string;
}

const QRCard: React.FC<QRCardProps> = ({
  createdAt,
  name,
  url,
  type,
  id,
  dynamic,
}) => {
  const [qr, setQr] = useState("");
  useEffect(() => {
    QRCode.toDataURL(url).then(setQr);
  }, [url]);
  const [showActions, setShowAction] = useState(false);
  const toggleShowActionVisibilty = () => setShowAction(!showActions);
  const router = useRouter();
  const actionRoute = () => {
    let URL = "/edit";
    if (type === "Email") URL += `/email/` + id;
    else if (type === "SMS") URL += `/sms/` + id;
    else URL += "/url/" + id;
    console.log(URL);

    router.push(URL);
  };

  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.href = qr;
    link.download = `${name}-qrcode.png`;
    link.click();
  };

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
      <div className="flex gap-3 cursor-pointer">
        {showActions && (
          <>
            <div className=" p-3 m-3 ">
              {dynamic && (
                <div
                  className="border-t-2 border-x-2 p-2 "
                  onClick={actionRoute}
                >
                  Edit
                </div>
              )}

              <div className="border-x-2 p-2" onClick={downloadQRCode}>
                Download
              </div>
              {/* <div className="border-b-2 border-x-2 p-2">Delete</div> */}
            </div>
          </>
        )}

        <Button onClick={toggleShowActionVisibilty}>Actions</Button>
      </div>
    </div>
  );
};

export default QRCard;
