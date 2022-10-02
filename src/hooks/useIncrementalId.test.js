import { renderHook } from "@testing-library/react";
import { useIncrementalId } from "./useIncrementalId";

describe("useIncrementalId(atom) hook", () => {
  it("should be a function", () => {
    expect(useIncrementalId).toBeInstanceOf(Function);
  });

  it("should return a function upon invocation", () => {
    const { result } = renderHook(() => useIncrementalId());
    expect(result.current).toBeInstanceOf(Function);
  });

  describe("the resulted function", () => {
    it("should return zero on first call", () => {
      const { result } = renderHook(() => useIncrementalId());
      expect(result.current()).toBe(0);
    });

    it("should return one on second call", () => {
      const { result } = renderHook(() => useIncrementalId());
      expect(result.current()).toBe(1);
    });
  });
});
