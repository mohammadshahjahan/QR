"use client";

import QRCard from "@/components/QRCard";
import useCurrentUserID from "@/libs/store/useCurrentUserID";
import axios from "axios";
import { useEffect, useState } from "react";

interface staticUrlProps {
  createdAt: string;
  goToURL: string;
  id: string;
  name: string;
  userId: string;
}
interface staticSMSProps {
  createdAt: string;
  countryCode: string;
  phoneNumber: string;
  id: string;
  name: string;
  userId: string;
}

interface staticEmailProps {
  createdAt: string;
  goToMail: string;
  id: string;
  name: string;
  userId: string;
}
interface dynamicUrlProps {
  createdAt: string;
  goToURL: string;
  id: string;
  name: string;
  userId: string;
  proxyURL: string;
}
interface dynamicEmailProps {
  createdAt: string;
  goToMail: string;
  id: string;
  name: string;
  userId: string;
  proxyURL: string;
}
interface dynamicSMSProps {
  createdAt: string;
  countryCode: string;
  phoneNumber: string;
  id: string;
  name: string;
  userId: string;
  proxyURL: string;
}
const Page = () => {
  const [staticURL, setStaticURL] = useState<staticUrlProps[]>();
  const [staticSMS, setStaticSMS] = useState<staticSMSProps[]>();
  const [staticEmail, setStaticEmail] = useState<staticEmailProps[]>();
  const [dynamicURL, setDynamicURL] = useState<dynamicUrlProps[]>();
  const [dynamicSMS, setDynamicSMS] = useState<dynamicSMSProps[]>();
  const [dynamicEmail, setDynamicEmail] = useState<dynamicEmailProps[]>();
  const { userId } = useCurrentUserID();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const response = await axios.get(`/api/user/${userId}`);
          setStaticURL(response.data.staticWebsitesQrs);
          setStaticSMS(response.data.staticSMSQrs);
          setStaticEmail(response.data.staticEmailQrs);
          setDynamicURL(response.data.dynamicWebsitesQrs);
          setDynamicSMS(response.data.dynamicSMSQrs);
          setDynamicEmail(response.data.dynamicEmailQrs);
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userId]);
  return (
    <div className="mt-16 ">
      <div>
        <div className="bg-slate-100 p-5 m-2">
          <div className="text-3xl">Your Static URL QRs</div>
          <div className="">
            {staticURL?.length ? (
              staticURL.map((e) => (
                <QRCard
                  key={e.createdAt}
                  createdAt={e.createdAt.split("T")[0]}
                  url={e.goToURL}
                  name={e.name}
                  type={"URL"}
                  id={e.id}
                />
              ))
            ) : (
              <div>No Static URL QRs made till now</div>
            )}
          </div>
        </div>
        <div className="bg-slate-100 p-5 m-2">
          <div className="text-3xl">Your Static SMS QRs</div>
          <div>
            {staticSMS?.length ? (
              staticSMS.map((e) => (
                <QRCard
                  key={e.createdAt}
                  createdAt={e.createdAt.split("T")[0]}
                  url={`sms:${e.countryCode}${e.phoneNumber}`}
                  name={e.name}
                  type={"SMS"}
                  id={e.id}
                />
              ))
            ) : (
              <div>No Static SMS QRs made till now</div>
            )}
          </div>
        </div>
        <div className="bg-slate-100 p-5 m-2">
          <div className="text-3xl">Your Static Email QRs</div>
          <div>
            {staticEmail?.length ? (
              staticEmail.map((e) => (
                <QRCard
                  key={e.createdAt}
                  createdAt={e.createdAt.split("T")[0]}
                  url={`mailto:${e.goToMail}}`}
                  name={e.name}
                  type={"Email"}
                  id={e.id}
                />
              ))
            ) : (
              <div>No Static Email QRs made till now</div>
            )}
          </div>
        </div>
        <div className="bg-slate-100 p-5 m-2">
          <div className="text-3xl">Your Dynamic URL QRs</div>
          <div>
            {dynamicURL?.length ? (
              dynamicURL.map((e) => (
                <QRCard
                  key={e.createdAt}
                  createdAt={e.createdAt.split("T")[0]}
                  url={e.proxyURL}
                  name={e.name}
                  type={"URL"}
                  dynamic
                  id={e.id}
                />
              ))
            ) : (
              <div>No Dynamic URL QRs made till now</div>
            )}
          </div>
        </div>
        <div className="bg-slate-100 p-5 m-2">
          <div className="text-3xl">Your Dyamic SMS QRs</div>
          <div>
            {dynamicSMS?.length ? (
              dynamicSMS.map((e) => (
                <QRCard
                  key={e.createdAt}
                  createdAt={e.createdAt.split("T")[0]}
                  url={e.proxyURL}
                  name={e.name}
                  type={"SMS"}
                  dynamic
                  id={e.id}
                />
              ))
            ) : (
              <div>No Dynamic SMS QRs made till now</div>
            )}
          </div>
        </div>
        <div className="bg-slate-100 p-5 m-2">
          <div className="text-3xl">Your Dynamic Email QRs</div>
          <div>
            {dynamicEmail?.length ? (
              dynamicEmail.map((e) => (
                <QRCard
                  key={e.createdAt}
                  createdAt={e.createdAt.split("T")[0]}
                  url={e.proxyURL}
                  name={e.name}
                  type={"Email"}
                  dynamic
                  id={e.id}
                />
              ))
            ) : (
              <div>No Dynamic Email QRs made till now</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
