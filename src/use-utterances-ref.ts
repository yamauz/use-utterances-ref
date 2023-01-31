import { useCallback, useEffect, useRef } from "react";
import { UtterancesOptions } from "./types";
import { buildScript } from "./utils";

const events = ["pushstate", "popstate", "replacestate"];
const isBrowser = typeof window !== "undefined";

const _useUtterancesRef = <T extends HTMLElement>(
  repo: string,
  options?: UtterancesOptions
) => {
  const ref = useRef<T | null>(null);

  const setUtterances = useCallback(() => {
    ref.current?.appendChild(buildScript(repo, options));
  }, [repo, options]);

  useEffect(() => {
    setUtterances();

    events.forEach((ev) => {
      window.addEventListener(ev, setUtterances);
    });

    return () => {
      events.forEach((ev) => {
        window.removeEventListener(ev, setUtterances);
      });
    };
  }, [setUtterances]);

  return ref;
};

const patchHistoryMethod = (method: "pushState" | "replaceState") => {
  const original = history[method];
  window.history[method] = function () {
    window.dispatchEvent(new Event(method.toLowerCase()));
    return original.apply(history, arguments as any);
  };
};

if (isBrowser) {
  patchHistoryMethod("pushState");
  patchHistoryMethod("replaceState");
}

export const useUtterancesRef = isBrowser ? _useUtterancesRef : () => null;
