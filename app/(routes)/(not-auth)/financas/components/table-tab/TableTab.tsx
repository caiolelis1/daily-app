"use client";
import { format } from "date-fns";

import { FullTransactionType } from "@/app/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import useTransactions from "@/app/context/TransactionsContext";
import { useEffect } from "react";
import NotFoundDisplay from "@/app/components/NotFoundDisplay";

interface TableTabProps {
  transactions: FullTransactionType[];
}

const TableTab = ({ transactions: transactionsData }: TableTabProps) => {
  const { transactions, setTransactions } = useTransactions();

  useEffect(() => {
    setTransactions(transactionsData);
  }, [transactionsData]);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Data</TableHead>
          <TableHead>Entrada/Saída</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Valor</TableHead>
        </TableRow>
      </TableHeader>
      {transactions.length === 0 && <NotFoundDisplay />}
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow
            key={transaction.id}
            className={cn(
              transaction.value > 0 ? "bg-green-500" : "bg-red-500"
            )}
          >
            <TableCell>{format(transaction.date, "dd/MM/yyyy")}</TableCell>
            <TableCell>{transaction.value > 0 ? "Entrada" : "Saída"}</TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>{transaction.category.name}</TableCell>
            <TableCell>R$ {transaction.value.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableTab;
