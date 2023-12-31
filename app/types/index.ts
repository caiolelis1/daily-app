import { Category, Transaction } from "@prisma/client";

export interface Event {
  id: string;
  datetime: Date;
  description: string;
  typeId: string;
}

export interface EventType {
  id: string;
  name: string;
}

export type FullTransactionType = Transaction & { category: Category };
