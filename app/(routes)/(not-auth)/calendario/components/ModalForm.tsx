import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { modalFormSchema } from "@/schemas";
import { Textarea } from "@/components/ui/textarea";

interface ModalFormProps {
  day: Date | null;
}

const ModalForm = ({ day }: ModalFormProps) => {
  const form = useForm<z.infer<typeof modalFormSchema>>({
    resolver: zodResolver(modalFormSchema),
    defaultValues: { grade: "" },
  });

  const onSubmit = (values: z.infer<typeof modalFormSchema>) => {
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
          <div className="flex flex-col items-center justify-around gap-4">
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
                    <Textarea placeholder="Descrição" {...field} rows={7} />
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
