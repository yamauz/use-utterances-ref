// @vitest-environment happy-dom

import { fireEvent } from "@testing-library/dom";
import { render } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { MultiChildren, NoChildren, SingleChild } from "./script-wrapper";
import * as utils from "../src/utils";

const { buildScript, handleLoadScript } = utils;
const repo = "test-repo";

describe("buildScript: success", () => {
  it("should return script element with default attribute.", () => {
    const script = buildScript(repo);

    expect(script).toHaveAttribute("issue-term", "pathname");
    expect(script).not.toHaveAttribute("issue-number");
    expect(script).toHaveAttribute("label");
    expect(script).toHaveAttribute("theme", "github-light");
  });
  it("should return script element with issue-number attribute.", () => {
    const script = buildScript(repo, { issueNumber: "123" });

    expect(script).toHaveAttribute("issue-number", "123");
    expect(script).not.toHaveAttribute("issue-term");
  });
  it("should return script element with other options", () => {
    const script = buildScript(repo, {
      issueTerm: "url",
      label: "test",
      theme: "github-dark",
    });

    expect(script).toHaveAttribute("issue-term", "url");
    expect(script).not.toHaveAttribute("issue-number");
    expect(script).toHaveAttribute("label", "test");
    expect(script).toHaveAttribute("theme", "github-dark");
  });
  it("should fire onload handler.", async () => {
    const handler = vi.spyOn(utils, "handleLoadScript");
    const script = buildScript(repo);
    expect(handler).not.toHaveBeenCalled();
    // @ts-ignore
    script.onload = handler;
    fireEvent.load(script);
    expect(handler).toHaveBeenCalledOnce();
    handler.mockClear();
  });
});

describe("buildScript: error", () => {
  it("should throw error if the repo is a empty string.", () => {
    expect(() => buildScript("")).toThrowError(
      "Repository name must be a non-empty string."
    );
  });
});

describe("handleLoadScript", () => {
  it("should set one script wrapper element.", async () => {
    const { container } = render(<SingleChild />);
    Object.defineProperty(global, "document", container);
    expect(container.querySelectorAll(".utterances").length).toBe(1);
    handleLoadScript();
    expect(container.querySelectorAll(".utterances").length).toBe(1);
  });

  it("should remove duplicate element.", async () => {
    const { container } = render(<MultiChildren />);
    Object.defineProperty(global, "document", container);
    expect(container.querySelectorAll(".utterances").length).toBe(5);
    handleLoadScript();
    expect(container.querySelectorAll(".utterances").length).toBe(1);
  });
  it("should do nothing if no script wrapper exists.", async () => {
    const { container } = render(<NoChildren />);
    Object.defineProperty(global, "document", container);
    expect(container.querySelectorAll(".utterances").length).toBe(0);
    handleLoadScript();
    expect(container.querySelectorAll(".utterances").length).toBe(0);
  });
});
