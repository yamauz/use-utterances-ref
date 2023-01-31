# useUtterancesRef

A custom hook to make utterances available in React apps

⚠️ ️You must install the GitHub Apps for utterances before using this library from [here](https://github.com/apps/utterances).

## Installation

With npm

```bash
npm i use-utterances-ref
```

With yarn

```bash
yarn add use-utterances-ref
```

## Usage

```tsx
import { useUtterancesRef } from "use-utterances-ref";

const ref = useUtterancesRef<HTMLDivElement>("user/public-repo");

return <div ref={ref} />;
```

## API

```ts
useUtterancesRef(repository_name, options);
```

### Arguments

#### repository_name

A public GitHub repository. This is where the blog post issues and issue-comments will be posted.

Required.
Set like "owner/repo"

#### options

All options is optional.
See [here](https://utteranc.es/) for more details on options.

| Key         | Type                                                                                                                                                                | Default        | Description                                                      |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ---------------------------------------------------------------- |
| issueTerm   | "pathname" \| "url" \| "title" \| "og:title" \| string                                                                                                              | "pathname"     | The mapping between blog posts and GitHub issues.                |
| issueNumber | string                                                                                                                                                              |                | If issueTerm is set, it is invalid.                              |
| label       | string                                                                                                                                                              |                | The label that will be assigned to issues created by Utterances. |
| theme       | "github-light" \| "github-dark" \| "preferred-color-scheme" \| "github-dark-orange" \| "icy-dark" \| "dark-blue" \| "photon-dark" \| "boxy-light" \| "gruvbox-dark" | "github-light" | A Theme that matches your blog.                                  |

### Returns

```tsx
React.MutableRefObject<T extends HTMLElement | null> | null
```

### License

MIT
