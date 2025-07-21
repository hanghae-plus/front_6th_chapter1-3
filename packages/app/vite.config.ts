import react from "@vitejs/plugin-react-oxc";
import { createViteConfig } from "../../createViteConfig";
import { resolve } from "path";
import fs from "fs";

const base: string = process.env.NODE_ENV === "production" ? "/front_6th_chapter1-3/" : "";

export default createViteConfig({
  base,
  plugins: [
    react(),
    {
      name: "copy-index-to-404",
      closeBundle() {
        fs.copyFileSync(resolve(__dirname, "dist/index.html"), resolve(__dirname, "dist/404.html"));
      },
    },
  ],
});
