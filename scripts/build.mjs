import { build } from "esbuild";

const options = {
  base: {
    entryPoints: ["./src/index.ts"],
    outdir: "dist",
    minify: true,
    bundle: true,
    external: ["react"],
  },
  esm: {
    format: "esm",
    outExtension: { ".js": ".esm.js" },
  },
  cjs: {
    format: "cjs",
  },
};

await build({ ...options.base, ...options.esm });
await build({ ...options.base, ...options.cjs });
