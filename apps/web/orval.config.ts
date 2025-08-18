import { defineConfig } from "orval";

export default defineConfig({
  glimmer: {
    input: "http://localhost:4001/api-yaml",
    output: {
      mode: "tags-split",
      target: "./src/services",
      schemas: "./src/models",
      client: "react-query",
      override: {
        header: false,
        mutator: {
          path: "./src/utils/request.ts",
          name: "request",
        },
      },
    },
  },
});
