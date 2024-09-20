import { PaymentType } from "@prisma/client";

import BalanceItem from "./BalanceItem";

interface BalanceProps {
  paymentTypes: PaymentType[];
}

const Balance = async ({ paymentTypes }: BalanceProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center lg:gap-20 gap-8 p-12">
      {paymentTypes.map((type) => (
        <BalanceItem key={type.id} item={type} />
      ))}
    </div>
  );
};

export default Balance;
