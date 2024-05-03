"use client";

import { ComboboxStatic } from "@/components/ComboboxStatic";
import StaticEmailForm from "@/components/StaticEmailForm";
import StaticSMSForm from "@/components/StaticSMSForm";
import StaticURLForm from "@/components/StaticURLForm";
import useStaticCurrentType from "@/libs/store/useStaticCurrentType";
import React from "react";

const Page = () => {
  const currstat = useStaticCurrentType();
  
  return (
    <div className="mt-16">
      <div className="p-5 text-xl md:text-2xl lg:text-3xl">
        <strong>Static Qr is available for free have fun!!</strong>
      </div>
      <div className="mt-3 flex flex-col justify-center items-center p-5">
        <ComboboxStatic />
        {currstat.url ? (
          <StaticURLForm />
        ) : currstat.sms ? (
          <StaticSMSForm />
        ) : currstat.email ? (
          <StaticEmailForm />
        ) : (
          <div>Choose an available service</div>
        )}
      </div>
    </div>
  );
};

export default Page;
