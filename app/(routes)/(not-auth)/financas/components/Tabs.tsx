import { PaymentType } from "@prisma/client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import getCategories from "@/app/actions/getActions/getCategories";
import getTransactions from "@/app/actions/getActions/getTransactions";
import FormTab from "./form-tab/FormTab";
import TableTab from "./table-tab/TableTab";
import GraphsTab from "./graphs-tab/GraphsTab";
import GoalsTab from "./goals-tab/GoalsTab";
import getFinancesGoals from "@/app/actions/getActions/getFinancesGoals";
import { TransactionsProvider } from "@/app/context/TransactionsContext";

interface TabsComponentProps {
  paymentTypes: PaymentType[];
}

const TabsComponent = async ({ paymentTypes }: TabsComponentProps) => {
  const categories = await getCategories();
  const transactions = await getTransactions();
  const goals = await getFinancesGoals();
  return (
    <Tabs className="" defaultValue="table">
      <TabsList className="text-md">
        <TabsTrigger value="table">Histórico</TabsTrigger>
        <TabsTrigger value="graphs">Gráficos</TabsTrigger>
        <TabsTrigger value="goals">Metas</TabsTrigger>
        <TabsTrigger value="form">Adicionar transação</TabsTrigger>
      </TabsList>
      <TransactionsProvider>
        <TabsContent value="table">
          <TableTab transactions={transactions} />
        </TabsContent>
        <TabsContent value="graphs">
          <GraphsTab />
        </TabsContent>
        <TabsContent value="goals">
          <GoalsTab goals={goals} />
        </TabsContent>
        <TabsContent value="form">
          <FormTab categories={categories} paymentTypes={paymentTypes} />
        </TabsContent>
      </TransactionsProvider>
    </Tabs>
  );
};

export default TabsComponent;
