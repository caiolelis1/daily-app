"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
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
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import axios from "axios";
import { Category, PaymentType } from "@prisma/client";

import { ptBR } from "date-fns/locale";
import { toast } from "@/components/ui/use-toast";

interface FormTabProps {
  categories: Category[];
  paymentTypes: PaymentType[];
}

const formSchema = z.object({
  type: z.string(),
  date: z.date(),
  category: z.string(),
  value: z.string(),
  description: z.string(),
  paymentType: z.string(),
});

const FormTab = ({ categories, paymentTypes }: FormTabProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { description: "", value: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    axios
      .post("/api/transaction", values)
      .then((data) => {
        console.log(data.data);
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
      .catch((error) => console.log(error))
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
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Entrada/Saída" />
                    </SelectTrigger>
                  </FormControl>
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
                  <SelectContent>
                    {paymentTypes.map((payment) => (
                      <SelectItem value={payment.id}>{payment.name}</SelectItem>
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
                  <SelectContent>
                    {categories.map((category) => (
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
                  <Input placeholder="Valor" type="number" {...field} />
                </FormControl>
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
