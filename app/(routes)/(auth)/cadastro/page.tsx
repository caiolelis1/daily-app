"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import CadastroForm from "./components/CadastroForm";

const Register = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-full">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-center">Cadastro</CardTitle>
        </CardHeader>
        <CardContent>
          <CadastroForm />

          <div className="flex items-center justify-center mt-4">
            <Button variant="link" onClick={() => router.push("/login")}>
              Faça login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
