import { PaymentType } from "@prisma/client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableTab from "./TableTab";
import GraphsTab from "./GraphsTab";
import FormTab from "./FormTab";
import GoalsTab from "./GoalsTab";
import getCategories from "@/app/actions/getCategories";
import getTransactions from "@/app/actions/getTransactions";

interface TabsComponentProps {
  paymentTypes: PaymentType[];
}

const TabsComponent = async ({ paymentTypes }: TabsComponentProps) => {
  const categories = await getCategories();
  const transactions = await getTransactions();
  return (
    <Tabs className="" defaultValue="table">
      <TabsList className="text-md">
        <TabsTrigger value="table">Histórico</TabsTrigger>
        <TabsTrigger value="graphs">Gráficos</TabsTrigger>
        <TabsTrigger value="goals">Metas</TabsTrigger>
        <TabsTrigger value="form">Adicionar transação</TabsTrigger>
      </TabsList>
      <TabsContent value="table">
        <TableTab transactions={transactions} />
      </TabsContent>
      <TabsContent value="graphs">
        <GraphsTab />
      </TabsContent>
      <TabsContent value="goals">
        <GoalsTab />
      </TabsContent>
      <TabsContent value="form">
        <FormTab categories={categories} paymentTypes={paymentTypes} />
      </TabsContent>
    </Tabs>
  );
};

export default TabsComponent;
