"use client";

import { PaymentType } from "@prisma/client";

interface BalanceItemProps {
  item: PaymentType;
}

const BalanceItem = ({ item }: BalanceItemProps) => {
  return (
    <div
      style={{ backgroundColor: item.color }}
      className="p-16 rounded-2xl drop-shadow-xl w-64 flex items-center justify-center"
    >
      <i></i>
      <span className="text-white font-black text-2xl">
        R$ {item.initialValue.toFixed(2)}
      </span>
    </div>
  );
};

export default BalanceItem;
