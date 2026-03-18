import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ConfirmationDialog } from "../ConfirmationDialog.tsx";

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = vi.fn();
});

describe("ConfirmationDialog", () => {
  const defaultProps = {
    title: "Заголовок",
    description: "Описание",
    rejectText: "Отмена",
    ConfirmSlot: <button>Подтвердить</button>,
    onClose: vi.fn(),
  };

  it("отображает заголовок, описание и текст кнопки отмены", () => {
    render(<ConfirmationDialog {...defaultProps} />);

    expect(screen.getByText("Заголовок")).toBeTruthy();
    expect(screen.getByText("Описание")).toBeTruthy();
    expect(screen.getByText("Отмена")).toBeTruthy();
  });

  it("отображает ConfirmSlot", () => {
    render(<ConfirmationDialog {...defaultProps} />);

    expect(screen.getByText("Подтвердить")).toBeTruthy();
  });

  it("вызывает onClose при клике на кнопку отмены", () => {
    const onClose = vi.fn();
    render(<ConfirmationDialog {...defaultProps} onClose={onClose} />);

    fireEvent.click(screen.getByText("Отмена"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("вызывает onClose при клике на кнопку ×", () => {
    const onClose = vi.fn();
    render(<ConfirmationDialog {...defaultProps} onClose={onClose} />);

    fireEvent.click(screen.getByText("×"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("вызывает onClose при событии cancel (Escape)", () => {
    const onClose = vi.fn();
    render(<ConfirmationDialog {...defaultProps} onClose={onClose} />);

    const dialog = screen.getByRole("dialog");
    fireEvent(dialog, new Event("cancel"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("вызывает showModal при монтировании", () => {
    render(<ConfirmationDialog {...defaultProps} />);

    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(1);
  });
});
