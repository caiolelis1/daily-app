"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { EventType } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/components/ui/use-toast";

interface EventFormProps {
  types: EventType[];
}

const formSchema = z.object({
  dateTime: z.date(),
  description: z.string(),
  type: z.string(),
});

const EventForm = ({ types }: EventFormProps) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { description: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    axios
      .post("/api/events", values)
      .then((data) => {
        const date = new Date(data.data.datetime);
        toast({
          title: "Evento criado com sucesso",
          description: (
            <>
              {format(date, "dd/MM HH:mm")} - {data.data.description}
            </>
          ),
        });
      })
      .catch((error) => console.log(error))
      .finally(() => form.reset());
  };
  return (
    <div className="flex flex-col bg-white gap-2 p-6 w-96 text-black">
      <div>
        <h2 className="font-bold text-2xl">Criar evento</h2>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col gap-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="dateTime"
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
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Descrição" type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

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
                      <SelectValue placeholder="Tipos" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {types.map((type) => (
                      <SelectItem value={type.id} key={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

export default EventForm;
