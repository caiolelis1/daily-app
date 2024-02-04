"use client";

import { Transaction } from "@prisma/client";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { FullTransactionType } from "../types";

type TransactionState = {
  transactions: FullTransactionType[];
  setTransactions(events: FullTransactionType[]): void;
};

const TransactionsContext = createContext<TransactionState | null>(null);

const useTransactions = (): TransactionState => {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error("Erro no event provider");
  }

  return context;
};

export default useTransactions;

export const TransactionsProvider = (props: PropsWithChildren) => {
  const [transactions, setTransactions] = useState<FullTransactionType[]>([]);

  return (
    <TransactionsContext.Provider value={{ transactions, setTransactions }}>
      {props.children}
    </TransactionsContext.Provider>
  );
};
