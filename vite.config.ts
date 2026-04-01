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
    build: {
      // Increase chunk size warning limit to 600kB
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks: {
            // Split React and React DOM into their own chunk
            "react-vendor": ["react", "react-dom", "react-dom/client"],
            
            // Split React Router into its own chunk
            "router-vendor": ["react-router-dom"],
            
            // Split UI libraries into their own chunks if they exist
            // These will only be created if the packages are used
            "ui-vendor": ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-slot"],
          },
        },
      },
    },
  });
};