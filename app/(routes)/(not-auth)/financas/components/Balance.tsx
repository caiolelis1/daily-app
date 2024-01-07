import { PaymentType } from "@prisma/client";

import BalanceItem from "./BalanceItem";

interface BalanceProps {
  paymentTypes: PaymentType[];
}

const Balance = async ({ paymentTypes }: BalanceProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center xl:justify-around lg:gap-20 gap-8 p-12">
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
