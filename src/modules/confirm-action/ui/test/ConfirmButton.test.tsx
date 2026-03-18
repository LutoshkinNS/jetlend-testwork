import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ConfirmButton } from "../ConfirmButton.tsx";

describe("ConfirmButton", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("кнопка заблокирована сразу, текст 'Подтвердить (5)'", () => {
    const onConfirm = vi.fn();
    render(<ConfirmButton onConfirm={onConfirm} />);

    const button = screen.getByRole("button");
    expect(button.textContent).toBe("Подтвердить (5)");
    expect((button as HTMLButtonElement).disabled).toBe(true);
  });

  it("через 3 секунды текст 'Подтвердить (2)', кнопка disabled", () => {
    const onConfirm = vi.fn();
    render(<ConfirmButton onConfirm={onConfirm} />);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    const button = screen.getByRole("button");
    expect(button.textContent).toBe("Подтвердить (2)");
    expect((button as HTMLButtonElement).disabled).toBe(true);
  });

  it("через 5 секунд кнопка активна, текст 'Подтвердить'", () => {
    const onConfirm = vi.fn();
    render(<ConfirmButton onConfirm={onConfirm} />);

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    const button = screen.getByRole("button");
    expect(button.textContent).toBe("Подтвердить");
    expect((button as HTMLButtonElement).disabled).toBe(false);
  });

  it("клик по активной кнопке вызывает onConfirm", () => {
    const onConfirm = vi.fn();
    render(<ConfirmButton onConfirm={onConfirm} />);

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    fireEvent.click(screen.getByRole("button"));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("клик по заблокированной кнопке не вызывает onConfirm", () => {
    const onConfirm = vi.fn();
    render(<ConfirmButton onConfirm={onConfirm} />);

    fireEvent.click(screen.getByRole("button"));
    expect(onConfirm).not.toHaveBeenCalled();
  });
});
