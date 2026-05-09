import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <Link
        href="/"
        className="mb-8 text-xl font-bold tracking-tight text-foreground hover:text-primary transition-colors"
      >
        Next.js Starter Kit
      </Link>
      {children}
    </div>
  );
}
