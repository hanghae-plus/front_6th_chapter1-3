import react from "@vitejs/plugin-react-oxc";
import { resolve } from "path";
import { createViteConfig } from "../../createViteConfig";

const base: string = process.env.NODE_ENV === "production" ? "/front_6th_chapter1-3/" : "";

export default createViteConfig({
  base,
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        404: resolve(__dirname, "404.html"),
      },
    },
  },
});
