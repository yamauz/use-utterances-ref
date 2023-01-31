// @vitest-environment happy-dom

import { renderHook } from "@testing-library/react-hooks";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { UtterancesOptions } from "../src/types";
import { useUtterancesRef } from "../src/use-utterances-ref";
import * as utils from "../src/utils";

const repo = "test-repo";
const options: UtterancesOptions = {
  issueTerm: "url",
  label: "test",
  theme: "github-dark",
};

beforeEach(async () => {
  vi.spyOn(utils, "buildScript");
  return async () => {
    vi.clearAllMocks();
  };
});

describe("Run on browser", () => {
  it("should return null if ref is not set.", () => {
    const { result } = renderHook(() => {
      const ref = useUtterancesRef<HTMLDivElement>(repo);
      return ref;
    });

    expect(result.current.current).toBeNull();
  });

  it("should call buildScript function on history state change.", () => {
    const { result } = renderHook(() => {
      const ref = useUtterancesRef<HTMLDivElement>(repo);
      ref.current = document.createElement("div");
      return ref;
    });

    expect(utils.buildScript).toHaveBeenCalledTimes(1);

    window.history.pushState({}, "", "/");
    expect(utils.buildScript).toHaveBeenCalledTimes(2);

    window.history.replaceState(null, null, "/");
    expect(utils.buildScript).toHaveBeenCalledTimes(3);

    const wrapper = result.current.current;
    const child = wrapper?.firstChild as HTMLScriptElement;

    expect(wrapper).not.toBeNull();
    expect(child.tagName).toBe("SCRIPT");
  });
  it("should call buildScript function without options.", () => {
    renderHook(() => {
      const ref = useUtterancesRef<HTMLDivElement>(repo);
      ref.current = document.createElement("div");
      return ref;
    });
    expect(utils.buildScript).toHaveBeenCalledWith(repo, undefined);
  });
  it("should call buildScript function with options.", () => {
    renderHook(() => {
      const ref = useUtterancesRef<HTMLDivElement>(repo, options);
      ref.current = document.createElement("div");
      return ref;
    });
    expect(utils.buildScript).toHaveBeenCalledWith(repo, options);
  });
  it("should set issue-number attribute", () => {
    const { result } = renderHook(() => {
      const ref = useUtterancesRef<HTMLDivElement>(repo, {
        issueNumber: "123",
      });
      ref.current = document.createElement("div");
      return ref;
    });

    const wrapper = result.current.current;
    const child = wrapper?.firstChild as HTMLScriptElement;

    expect(child).toHaveAttribute("issue-number", "123");
    expect(child).not.toHaveAttribute("issue-term");
  });
  it("should set specified attributes", () => {
    const { result } = renderHook(() => {
      const ref = useUtterancesRef<HTMLDivElement>(repo, {
        issueTerm: "url",
        label: "test",
        theme: "github-dark",
      });
      ref.current = document.createElement("div");
      return ref;
    });

    const wrapper = result.current.current;
    const child = wrapper?.firstChild as HTMLScriptElement;

    expect(child).toHaveAttribute("issue-term", "url");
    expect(child).not.toHaveAttribute("issue-number");
    expect(child).toHaveAttribute("label", "test");
    expect(child).toHaveAttribute("theme", "github-dark");
  });
});
