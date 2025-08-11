import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = (resolvedTheme ?? theme) === "dark";

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 opacity-0">
        <Sun className="h-4 w-4" />
        <Switch />
        <Moon className="h-4 w-4" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 select-none">
      <Sun className="h-4 w-4" aria-hidden />
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        aria-label="Toggle dark mode"
      />
      <Moon className="h-4 w-4" aria-hidden />
      <Label htmlFor="theme" className="sr-only">
        Theme
      </Label>
    </div>
  );
}
