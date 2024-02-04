"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { EventWithTypeIndex } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { eventFormSchema } from "@/schemas";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useEvents from "@/app/context/CalendarContext";
import { DialogTrigger } from "@radix-ui/react-dialog";

interface EventFormProps {
  // types: EventType[];
}

const EventForm = ({}: EventFormProps) => {
  const { toast } = useToast();

  const { events, setEvents } = useEvents();

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: { description: "", time: "" },
  });

  const onSubmit = (values: z.infer<typeof eventFormSchema>) => {
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

        let eventAux: EventWithTypeIndex = {
          id: data.data.id,
          allDay: data.data.allDay,
          datetime: new Date(data.data.datetime),
          description: data.data.description,
          typeId: data.data.typeId,
          typeIdIndex: data.data.typeIdIndex,
          userId: data.data.userId,
        };
        setEvents([...events, eventAux]);
      })
      .catch((error) => console.log(error))
      .finally(() => form.reset());
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="default" className="flex gap-2">
          <PlusCircle />
          <span>Criar evento</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar evento</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex gap-6">
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
                              format(field.value, "dd/MM/yy", { locale: ptBR })
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
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Hora" type="time" {...field} />
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
                    <Input placeholder="Descrição" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
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
                    <FormMessage />
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
            /> */}
            <FormField
              control={form.control}
              name="allDay"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Evento dura o dia inteiro</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" variant="default">
              Criar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;
