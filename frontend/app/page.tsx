"use client";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/themeToggle";

import { ThemeProvider } from "next-themes";

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
