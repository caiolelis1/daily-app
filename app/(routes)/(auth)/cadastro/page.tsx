"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
});

const Register = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", name: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    axios
      .post("/api/register", values)
      .then(() => signIn("credentials", values))
      .catch(() => console.log("erros"))
      .finally(() => console.log("finally"));
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Nome" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
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
            Criar
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Register;
