import AppBar from "@/components/AppBar";
import { getServerSession } from "next-auth";

async function getUser() {
  const session = await getServerSession();
  return session;
}

export default async function Home() {
  const session = await getUser();
  return (
    <div className="mt-16">
      <div className="">Hello {session?.user?.name} </div>
    </div>
  );
}
