import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas";
import { login } from "@/app/actions/login";
import * as z from "zod";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const [error, setError] = useState<string>("");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    login(values)
      .then((data) => {
        if (data?.error) {
          form.reset();
          setError(data.error);
        }
      })
      .catch(() => console.log("Something went wrong"));
  };
  return (
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
        <p className="text-sm font-medium text-red-500 dark:text-red-900">
          {error}
        </p>
        <Button type="submit" variant="default">
          Logar
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
