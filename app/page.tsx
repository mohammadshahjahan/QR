import CreateButtons from "@/components/CreateButtons";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import Image from "next/image";
import img1 from "@/public/msjqrs.png";

async function getUser() {
  const session = await getServerSession();
  return session;
}

export default async function Home() {
  const session = await getUser();
  return (
    <div className="mt-16">
      <CreateButtons />
      <div className="m-4 grid md:grid-cols-2 gap-4 sm:grid-cols-1 bg-slate-100 p-10 rounded-2xl">
        <div>
          <h1 className="text-green-950 text-5xl mb-4">QR Code with MSJ</h1>
          <div className="mt-3 mb-3">
            Easily generate static and dynamic QR codes without the hassle of
            personalization. Our platform streamlines the process, allowing you
            to create QR codes quickly and efficiently. Whether you need a fixed
            link or a dynamic one, our straightforward approach ensures that
            your QR codes are ready for immediate use without any unnecessary
            complexity.
          </div>
        </div>
        <div>
          <div className="text-center flex items-center justify-center">
            <Image src={img1} alt="no image" />
          </div>
        </div>
      </div>
    </div>
  );
}
