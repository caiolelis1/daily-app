"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex justify-around items-center">
      <div
        className="rounded-lg border px-32 py-16 cursor-pointer"
        onClick={() => router.push("/calendario")}
      >
        <Button variant="link">Calendário</Button>
      </div>
      <div
        className="rounded-lg border px-32 py-16 cursor-pointer"
        onClick={() => router.push("/financas")}
      >
        <Button variant="link">Finanças</Button>
      </div>
    </main>
  );
}
