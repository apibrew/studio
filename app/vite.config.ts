// vite.config.js in host-app
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import {resolve} from "path";
import dts from 'vite-plugin-dts'

export default defineConfig(env => {
    if (env.mode === 'lib') {
        return libConfig() as any;
    } else {
        return appConfig() as any;
    }
});

function appConfig() {
    return {
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
    }
}

function libConfig() {
    return {
        plugins: [
            react(),
            dts({include: ['src']})
        ],
        build: {
            copyPublicDir: false,
            lib: {
                entry: resolve(__dirname, 'src/lib.tsx'),
                formats: ['es']
            },
            rollupOptions: {
                external: (dep: string) => {
                    if (dep.indexOf('studio/app') !== -1) {
                        // console.log(dep + ' is internal')
                        return false
                    }
                    if (dep.indexOf('./') === 0) {
                        // console.log(dep + ' is internal')
                        return false
                    }
                    if (dep.indexOf('../') === 0) {
                        // console.log(dep + ' is internal')
                        return false
                    }
                    // console.log(dep + ' is external')
                    return true
                },
            }
        }
    }
}
