import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ConfirmationsProvider } from "../ConfirmationsProvider.tsx";
import { useGetConfirmation } from "../confirmation.ts";

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = vi.fn();
});

function TestConsumer({
  onResult,
  props = {},
}: {
  onResult: (result: boolean) => void;
  props?: Parameters<
    ReturnType<typeof useGetConfirmation>["getConfirmation"]
  >[0];
}) {
  const { getConfirmation } = useGetConfirmation();

  return (
    <button
      onClick={async () => {
        const result = await getConfirmation(props);
        onResult(result);
      }}
    >
      Открыть
    </button>
  );
}

function renderWithProvider(
  onResult: (result: boolean) => void,
  props?: Parameters<
    ReturnType<typeof useGetConfirmation>["getConfirmation"]
  >[0],
) {
  return render(
    <ConfirmationsProvider>
      <TestConsumer onResult={onResult} props={props} />
    </ConfirmationsProvider>,
  );
}

describe("ConfirmationsProvider", () => {
  it("не показывает диалог при монтировании", () => {
    renderWithProvider(vi.fn());

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("показывает диалог после вызова getConfirmation", async () => {
    renderWithProvider(vi.fn());

    await act(async () => {
      fireEvent.click(screen.getByText("Открыть"));
    });

    expect(screen.getByRole("dialog")).toBeTruthy();
  });

  it("показывает дефолтные title и description", async () => {
    renderWithProvider(vi.fn());

    await act(async () => {
      fireEvent.click(screen.getByText("Открыть"));
    });

    expect(screen.getByText("Подтверждение")).toBeTruthy();
    expect(screen.getByText("Вы уверены?")).toBeTruthy();
  });

  it("показывает переданные title и description", async () => {
    renderWithProvider(vi.fn(), {
      title: "Удалить запись?",
      description: "Это действие нельзя отменить",
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Открыть"));
    });

    expect(screen.getByText("Удалить запись?")).toBeTruthy();
    expect(screen.getByText("Это действие нельзя отменить")).toBeTruthy();
  });

  it("показывает дефолтный rejectText", async () => {
    renderWithProvider(vi.fn());

    await act(async () => {
      fireEvent.click(screen.getByText("Открыть"));
    });

    expect(screen.getByText("Отмена")).toBeTruthy();
  });

  it("показывает переданный rejectText", async () => {
    renderWithProvider(vi.fn(), { rejectText: "Нет" });

    await act(async () => {
      fireEvent.click(screen.getByText("Открыть"));
    });

    expect(screen.getByText("Нет")).toBeTruthy();
  });

  it("резолвит true и закрывает диалог при подтверждении", async () => {
    const onResult = vi.fn();
    renderWithProvider(onResult);

    await act(async () => {
      fireEvent.click(screen.getByText("Открыть"));
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Подтвердить"));
    });

    expect(onResult).toHaveBeenCalledWith(true);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("резолвит false и закрывает диалог при отмене", async () => {
    const onResult = vi.fn();
    renderWithProvider(onResult);

    await act(async () => {
      fireEvent.click(screen.getByText("Открыть"));
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Отмена"));
    });

    expect(onResult).toHaveBeenCalledWith(false);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("не закрывает диалог при подтверждении если shouldCloseOnConfirm=false", async () => {
    renderWithProvider(vi.fn(), { shouldCloseOnConfirm: false });

    await act(async () => {
      fireEvent.click(screen.getByText("Открыть"));
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Подтвердить"));
    });

    expect(screen.getByRole("dialog")).toBeTruthy();
  });

  it("использует переданный ConfirmSlot", async () => {
    function CustomConfirm({ onConfirm }: { onConfirm: () => void }) {
      return <button onClick={onConfirm}>Да, точно</button>;
    }

    renderWithProvider(vi.fn(), { ConfirmSlot: CustomConfirm });

    await act(async () => {
      fireEvent.click(screen.getByText("Открыть"));
    });

    expect(screen.getByText("Да, точно")).toBeTruthy();
  });
});
