"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "./components/LoginForm";

const Login = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-full">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className="flex items-center justify-center mt-4">
            <Button variant="link" onClick={() => router.push("/cadastro")}>
              Cadastre-se
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
