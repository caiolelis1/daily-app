import { Category, Event, Transaction } from "@prisma/client";

export type EventWithTypeIndex = Event & { typeIdIndex: number };

export type FullTransactionType = Transaction & { category: Category };
