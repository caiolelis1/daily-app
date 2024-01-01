import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface ModalFormProps {
  day: Date | null;
}

const formSchema = z.object({
  grade: z.string(),
  description: z.string(),
});

const ModalForm = ({ day }: ModalFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { grade: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const postBody = { ...values, day };
    axios
      .post("/api/day", postBody)
      .then(() => console.log("a"))
      .catch((error: any) => console.log(error))
      .finally(() => console.log("finally"));
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex items-center justify-around gap-12">
            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Valor" type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Descrição" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end ">
            <Button type="submit" variant="default">
              Adicionar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ModalForm;
