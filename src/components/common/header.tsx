import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { cn } from "@/lib/utils";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-foreground hover:text-foreground/80"
        >
          Next.js Starter Kit
          <Badge variant="secondary" className="text-xs">v1.0</Badge>
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            href="/dashboard"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            대시보드
          </Link>
          <Separator orientation="vertical" className="h-4" />
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            로그인
          </Link>
          <Link
            href="/register"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            회원가입
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
