"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { goalFormSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NumericFormat } from "react-number-format";
import axios from "axios";
import { error } from "console";

const GoalForm = () => {
  const form = useForm<z.infer<typeof goalFormSchema>>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {},
  });

  const onSubmit = (values: z.infer<typeof goalFormSchema>) => {
    values.value = values.value.split(" ")[1].replace(",", ".");
    axios
      .post("/api/finances/goals", values)
      .then((data) => console.log(data))
      .catch((error: any) => console.log(error))
      .finally(() => form.reset());
  };
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Criar novo</DialogTitle>
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
                    <Input placeholder="Nome" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <NumericFormat
                      thousandSeparator=""
                      decimalSeparator=","
                      prefix="R$ "
                      decimalScale={2}
                      placeholder="Valor"
                      className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus:outline-none focus-visible:outline-none 0  disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Link" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="default">
              Criar
            </Button>
          </form>
        </Form>
      </DialogHeader>
    </DialogContent>
  );
};

export default GoalForm;
