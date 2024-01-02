"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { login } from "@/app/actions/login";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    login(values)
      .then((data) => {
        if (data?.error) {
          form.reset();
          console.log(data.error);
        }
      })
      .catch(() => console.log("Something went wrong"));
  };

  return (
    <div className="flex justify-center items-center h-full">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-3"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="E-mail" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Senha" type="password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" variant="default">
                Logar
              </Button>
            </form>
          </Form>
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
