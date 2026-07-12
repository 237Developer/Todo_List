import config from "eslint-config-xo";
import { defineConfig } from "eslint/config";

export default defineConfig([
  ...config({ browser: true, prettier: "compat" }),
  {
    rules: { "@html-eslint/require-explicit-size": "off" },
  },
]);
