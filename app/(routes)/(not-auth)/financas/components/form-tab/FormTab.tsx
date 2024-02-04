"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { NumericFormat } from "react-number-format";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Category, PaymentType } from "@prisma/client";

import { toast } from "@/components/ui/use-toast";
import { financeFormSchema } from "@/schemas";

interface FormTabProps {
  categories: Category[];
  paymentTypes: PaymentType[];
}

const FormTab = ({ categories, paymentTypes }: FormTabProps) => {
  const [type, setType] = useState<boolean>();
  const [filteredCategories, setFilteredCategories] = useState(categories);

  useEffect(() => {
    const auxCategories = categories.filter(
      (category) => category.type === type
    );
    setFilteredCategories(auxCategories);
  }, [type]);

  const form = useForm<z.infer<typeof financeFormSchema>>({
    resolver: zodResolver(financeFormSchema),
    defaultValues: { description: "", value: "" },
  });

  const onSubmit = (values: z.infer<typeof financeFormSchema>) => {
    values.value = values.value.split(" ")[1].replace(",", ".");

    axios
      .post("/api/transaction", values)
      .then((data) => {
        const date = new Date(data.data.date);
        toast({
          title: "Transação criada com sucesso",
          description: (
            <>
              R$ {data.data.value} - {format(date, "dd/MM")} -{" "}
              {data.data.description}
            </>
          ),
        });
      })
      .catch((error) =>
        toast({
          title: "Ocorreu erro durante a criação de transação",
          description: <>{error}</>,
        })
      )
      .finally(() => form.reset());
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex items-center justify-around gap-12">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setType(value === "1");
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Entrada/Saída" />
                    </SelectTrigger>
                  </FormControl>
                  <FormMessage />
                  <SelectContent>
                    <SelectItem value="1">Entrada</SelectItem>
                    <SelectItem value="0">Saída</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: ptBR })
                        ) : (
                          <span>Escolha a data</span>
                        )}

                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <FormMessage />
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentType"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Contas" />
                    </SelectTrigger>
                  </FormControl>
                  <FormMessage />
                  <SelectContent>
                    {paymentTypes.map((payment) => (
                      <SelectItem key={payment.id} value={payment.id}>
                        {payment.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-around gap-12">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Categorias" />
                    </SelectTrigger>
                  </FormControl>
                  <FormMessage />
                  <SelectContent>
                    {filteredCategories.length === 0 && (
                      <div className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50">
                        Sem categoria disponível, selecione o tipo
                      </div>
                    )}
                    {filteredCategories.map((category) => (
                      <SelectItem value={category.id} key={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Descrição"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end ">
          <Button type="submit" variant="default">
            Adicionar
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormTab;
