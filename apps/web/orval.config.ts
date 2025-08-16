import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: 'http://localhost:3001/api-json',
    },
    output: {
      mode: 'split',
      target: 'src/lib/api.ts',
      schemas: 'src/lib/model',
      client: 'axios',
      mock: true,
    },
  },
});