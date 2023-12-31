import getPaymentTypes from "@/app/actions/getPaymentTypes";
import BalanceItem from "./BalanceItem";
import { PaymentType } from "@prisma/client";

interface BalanceProps {
  paymentTypes: PaymentType[];
}

const Balance = async ({ paymentTypes }: BalanceProps) => {
  return (
    <div className="flex items-center justify-around p-12">
      {paymentTypes.map((type) => (
        <BalanceItem key={type.id} bgColor="#1c60ab" item={type} />
      ))}
    </div>
  );
};

export default Balance;

{
  /* <BalanceItem bgColor="#1c60ab" />
      <BalanceItem bgColor="#43E767" />
      <BalanceItem bgColor="#ff7a00" /> */
}
