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
    <section className="flex flex-col items-start gap-4 p-6">
      <h1 className="text-2xl font-bold text-gray-900">Task 7</h1>
      <button
        onClick={handleAction}
        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        Выполнить действие
      </button>
    </section>
  );
}
