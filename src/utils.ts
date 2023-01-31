import { UtterancesOptions } from "./types";

export const buildScript = (repo: string, options?: UtterancesOptions) => {
  if (repo === "") throw Error("Repository name must be a non-empty string.");

  const scriptElement = document.createElement("script");

  scriptElement.async = true;
  scriptElement.crossOrigin = "anonymous";
  scriptElement.src = "https://utteranc.es/client.js";

  scriptElement.setAttribute("repo", repo);
  if (options?.issueNumber) {
    scriptElement.setAttribute("issue-number", options.issueNumber);
  } else {
    scriptElement.setAttribute("issue-term", options?.issueTerm ?? "pathname");
  }
  scriptElement.setAttribute("label", options?.label ?? "");
  scriptElement.setAttribute("theme", options?.theme ?? "github-light");
  scriptElement.onload = () => {
    handleLoadScript();
  };

  return scriptElement;
};

export const handleLoadScript = () => {
  const elms = document.getElementsByClassName("utterances");

  for (let i = 0; i < elms.length - 1; i++) {
    elms[i].remove();
  }
};
