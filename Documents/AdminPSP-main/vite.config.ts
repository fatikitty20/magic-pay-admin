import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

const DEFAULT_DEV_SERVER_PORT = 8081;

const obtenerPuertoServidor = (value?: string): number => {
  const port = Number(value);

  return Number.isInteger(port) && port > 0 ? port : DEFAULT_DEV_SERVER_PORT;
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: "::",
      port: obtenerPuertoServidor(env.VITE_DEV_SERVER_PORT),
      hmr: {
        overlay: false,
      },
    },
    plugins: [
      react(),
      visualizer({
        filename: "dist/bundle-stats.html",
        template: "treemap",
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
    },
  };
});
