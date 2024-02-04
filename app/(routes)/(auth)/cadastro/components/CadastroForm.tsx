import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const CadastroForm = () => {
  const [error, setError] = useState<string>("");
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", name: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    axios
      .post("/api/auth/register", values)
      .then(() => signIn("credentials", values))
      .catch((error) => setError(error))
      .finally(() => console.log("finally"));
  };
  return (
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
              <FormMessage />
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
              <FormMessage />
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
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="default">
          Criar
        </Button>
        <p className="text-sm font-medium text-red-500 dark:text-red-900">
          {error}
        </p>
      </form>
    </Form>
  );
};

export default CadastroForm;
