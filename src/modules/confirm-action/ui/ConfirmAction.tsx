import { useState } from "react";
import { Button } from "@/common/ui/button";
import { useGetConfirmation } from "@/common/ui/confirmation";
import { ConfirmButton } from "./ConfirmButton";

export function ConfirmAction() {
  const { getConfirmation } = useGetConfirmation();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const performAction = () => {
    alert("Действие выполнено");
  };

  const handleAction = async () => {
    if (isConfirmed) {
      performAction();
      return;
    }

    const confirmed = await getConfirmation({
      title: "Согласие с правилами",
      description:
        "Пожалуйста, ознакомьтесь с правилами и подтвердите своё согласие. Кнопка подтверждения станет доступна через несколько секунд.",
      ConfirmSlot: ConfirmButton,
      shouldCloseOnConfirm: true,
    });

    if (confirmed) {
      setIsConfirmed(true);
      performAction();
    }
  };

  return (
    <section className="flex flex-col items-start gap-4 p-6">
      <h1 className="text-2xl font-bold text-gray-900">Task 7</h1>
      <Button onClick={handleAction}>Выполнить действие</Button>
    </section>
  );
}
