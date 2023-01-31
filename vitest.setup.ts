import matchers from "@testing-library/jest-dom/matchers";
import { expect } from "vitest";
expect.extend(matchers); // expectのextendメソッドに拡張マッチャーを指定して拡張
