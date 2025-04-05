import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "mui-alert-provider": "../src", // Alias to resolve the src folder
    },
  },
});
