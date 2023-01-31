// @vitest-environment node
import { renderHook } from "@testing-library/react-hooks";
import { expect, test, describe } from "vitest";
import { useUtterancesRef } from "../src";

describe("Run on server", () => {
  test("should use counter", () => {
    const { result } = renderHook(() =>
      useUtterancesRef<HTMLDivElement>("user/public-repo")
    );

    expect(result.current).toBeNull();
  });
});
