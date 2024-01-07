import { Category, Event, Transaction } from "@prisma/client";

export type EventWithTypeIndex = Event & { typeIdIndex: number };

export interface EventType {
  id: string;
  name: string;
}

export type FullTransactionType = Transaction & { category: Category };
