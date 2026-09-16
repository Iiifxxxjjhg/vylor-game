import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ⚠️ مهم: "base" لازم يكون بالظبط زي اسم الـ repository بتاعك على GitHub
// لو اسم الريبو مختلف عن "story-tree-game"، غيّر السطر ده يطابقه
export default defineConfig({
  plugins: [react()],
  base: "/vylor-game/",
});
