import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default ({ mode }: any) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    server: {
      host: env.VITE_APP_HOST,
      port: Number(env.VITE_APP_PORT),
    },
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  });
};