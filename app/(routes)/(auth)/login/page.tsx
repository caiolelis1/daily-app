"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const Login = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    signIn("credentials", { ...values, redirect: false }).then((callback) => {
      if (callback?.error) {
        console.log("Invalid credentials!");
      }
      if (callback?.ok && !callback?.error) {
        console.log("Logged in!");
        router.push("/");
      }
    });
  };

  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col gap-2"
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
    </div>
  );
};

export default Login;
