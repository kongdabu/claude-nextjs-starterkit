"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const THEME_CYCLE = ["light", "dark", "system"] as const;
type Theme = (typeof THEME_CYCLE)[number];

const THEME_LABELS: Record<Theme, string> = {
  light: "라이트 모드",
  dark: "다크 모드",
  system: "시스템 설정",
};

const THEME_ICONS: Record<Theme, React.ReactNode> = {
  light: <Sun className="h-4 w-4" />,
  dark: <Moon className="h-4 w-4" />,
  system: <Monitor className="h-4 w-4" />,
};

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  // 서버/클라이언트 초기 렌더링을 "system"으로 통일 → 하이드레이션 불일치 방지
  // mount 후에만 실제 저장된 테마 반영
  const currentTheme = mounted ? ((theme as Theme) ?? "system") : "system";
  const nextTheme = THEME_CYCLE[(THEME_CYCLE.indexOf(currentTheme) + 1) % THEME_CYCLE.length];

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(nextTheme)}
            aria-label={THEME_LABELS[currentTheme]}
          />
        }
      >
        {THEME_ICONS[currentTheme]}
      </TooltipTrigger>
      <TooltipContent>{THEME_LABELS[currentTheme]}</TooltipContent>
    </Tooltip>
  );
}
