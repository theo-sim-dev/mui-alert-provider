// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist/**"], // Exclude all files under the dist directory
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
);
