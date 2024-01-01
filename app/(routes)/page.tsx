"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="">
      <Button
        onClick={() => {
          router.push("/calendario");
        }}
      >
        Calendário
      </Button>
    </main>
  );
}
