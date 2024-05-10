// vite.config.js in host-app
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
    plugins: [
        react(),
        federation({
            name: "host-app",
            remotes: {},
            shared: ["react"],
        }),
    ],
    build: {
        modulePreload: false,
        target: "esnext",

        minify: false,
        cssCodeSplit: false,
    },
});
