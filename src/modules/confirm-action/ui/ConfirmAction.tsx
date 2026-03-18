import { useState } from "react";
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
    <section>
      <h1>Task 7</h1>
      <div>
        <button onClick={handleAction}>Выполнить действие</button>
      </div>
    </section>
  );
}
