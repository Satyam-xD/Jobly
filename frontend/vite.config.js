import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // supports @/components etc.
    },
  },
  optimizeDeps: {
    include: [
      "@reduxjs/toolkit",
      "react-redux",
      "framer-motion",
      "lucide-react",
      "tailwind-merge",
      "class-variance-authority",
      "tailwindcss-animate"
    ]
  }
});
