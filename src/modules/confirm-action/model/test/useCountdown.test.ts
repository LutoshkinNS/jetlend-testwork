import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCountdown } from "../useCountdown.ts";

describe("useCountdown", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("начальное remaining равно from, isComplete = false", () => {
    const { result } = renderHook(() => useCountdown(5, true, 1));

    expect(result.current.remaining).toBe(5);
    expect(result.current.isComplete).toBe(false);
  });

  it("каждую секунду remaining уменьшается на 1", () => {
    const { result } = renderHook(() => useCountdown(5, true, 1));

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.remaining).toBe(4);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.remaining).toBe(3);
  });

  it("после from секунд isComplete = true, remaining = 0", () => {
    const { result } = renderHook(() => useCountdown(5, true, 1));

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.remaining).toBe(0);
    expect(result.current.isComplete).toBe(true);
  });

  it("если isActive = false — таймер не запускается", () => {
    const { result } = renderHook(() => useCountdown(5, false, 1));

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.remaining).toBe(5);
    expect(result.current.isComplete).toBe(false);
  });

  it("при смене sessionKey — счётчик сбрасывается", () => {
    let sessionKey = 1;
    const { result, rerender } = renderHook(() =>
      useCountdown(5, true, sessionKey),
    );

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(result.current.remaining).toBe(2);

    sessionKey = 2;
    rerender();

    expect(result.current.remaining).toBe(5);
    expect(result.current.isComplete).toBe(false);
  });
});
