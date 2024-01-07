"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface GoalItemProps {}

const GoalItem = ({}: GoalItemProps) => {
  const router = useRouter();
  return (
    <div className="border rounded-md shadow-lg p-6 cursor-pointer flex gap-6">
      <div>Imagem</div>
      <div>
        <h2>AirPods com Estojo de Recarga Sem Fio, Branco - MRXJ2BE/A</h2>
        <h3>R$ 854,05</h3>
        <Button
          variant="link"
          onClick={() =>
            router.push(
              "https://www.kabum.com.br/produto/102048/airpods-com-estojo-de-recarga-sem-fio-branco-mrxj2be-a?gad_source=1&gclid=Cj0KCQiAhc-sBhCEARIsAOVwHuTOwKHaDjDKiUdapF9_V6yqEqr2S4lm1O91Cq3SvZjGUgnQb76pWdUaAqc4EALw_wcB"
            )
          }
        >
          https://www.kabum.com.br/produto/102048/airpods-com-estojo-de-recarga-sem-fio-branco-mrxj2be-a?gad_source=1&gclid=Cj0KCQiAhc-sBhCEARIsAOVwHuTOwKHaDjDKiUdapF9_V6yqEqr2S4lm1O91Cq3SvZjGUgnQb76pWdUaAqc4EALw_wcB
        </Button>
      </div>
    </div>
  );
};

export default GoalItem;
