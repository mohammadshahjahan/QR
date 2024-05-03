"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const CreateButtons = () => {
  const router = useRouter();
  return (
    <div className="flex items-end space-x-3 justify-end mr-2">
      <Button onClick={() => router.push("/static")}>Create Static QR</Button>
      <Button onClick={() => router.push("/dynamic")}>Create Dynamic QR</Button>
    </div>
  );
};

export default CreateButtons;
