export type UtterancesOptions = {
  issueTerm?: "pathname" | "url" | "title" | "og:title" | string;
  issueNumber?: string;
  label?: string;
  theme?:
    | "github-light"
    | "github-dark"
    | "preferred-color-scheme"
    | "github-dark-orange"
    | "icy-dark"
    | "dark-blue"
    | "photon-dark"
    | "boxy-light"
    | "gruvbox-dark";
};
