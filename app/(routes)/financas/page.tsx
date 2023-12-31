import getPaymentTypes from "@/app/actions/getPaymentTypes";
import Balance from "./components/Balance";
import TabsComponent from "./components/Tabs";

const FinancePage = async () => {
  const paymentTypes = await getPaymentTypes();
  return (
    <div className="flex flex-col px-20 py-4 gap-6">
      <Balance paymentTypes={paymentTypes} />
      <TabsComponent paymentTypes={paymentTypes} />
    </div>
  );
};

export default FinancePage;
