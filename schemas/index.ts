import * as z from "zod";

const REQUIRED_TEXT = "Campo obrigatório";
const INVALID_EMAIL = "Endereço de e-mail inválido";
const PASSWORD_MIN = "Mínimo de 4 caracteres";
const PASSWORD_MAX = "Máximo de 20 caracteres";

export const loginSchema = z.object({
  email: z.string().email({ message: INVALID_EMAIL }),
  password: z
    .string()
    .min(4, { message: PASSWORD_MIN })
    .max(20, { message: PASSWORD_MAX }),
});

export const registerSchema = z.object({
  email: z.string().email({ message: INVALID_EMAIL }),
  name: z.string().min(1, { message: REQUIRED_TEXT }),
  password: z
    .string()
    .min(4, { message: PASSWORD_MIN })
    .max(20, { message: PASSWORD_MAX }),
});

export const eventFormSchema = z.object({
  dateTime: z.date({ required_error: REQUIRED_TEXT }),
  allDay: z.boolean().default(false).optional(),
  time: z
    .string({ required_error: REQUIRED_TEXT })
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  description: z.string().min(1, { message: REQUIRED_TEXT }),
  type: z.string({ required_error: REQUIRED_TEXT }),
});

export const modalFormSchema = z.object({
  grade: z.string().min(1, { message: REQUIRED_TEXT }),
  description: z.string().min(1, { message: REQUIRED_TEXT }),
});

export const financeFormSchema = z.object({
  type: z.string({ required_error: REQUIRED_TEXT }),
  date: z.date({ required_error: REQUIRED_TEXT }),
  category: z.string({ required_error: REQUIRED_TEXT }),
  value: z.string().min(1, { message: REQUIRED_TEXT }),
  description: z.string().min(1, { message: REQUIRED_TEXT }),
  paymentType: z.string({ required_error: REQUIRED_TEXT }),
});

export const goalFormSchema = z.object({
  name: z.string({ required_error: REQUIRED_TEXT }),
  link: z.string({ required_error: REQUIRED_TEXT }),
  value: z.string().min(1, { message: REQUIRED_TEXT }),
});
