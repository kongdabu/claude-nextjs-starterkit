"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-2">
            <AlertCircle className="h-12 w-12 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold">오류가 발생했습니다</CardTitle>
          <CardDescription>
            요청을 처리하는 중 문제가 발생했습니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">
            잠시 후 다시 시도해주세요. 문제가 지속되면 관리자에게 문의하세요.
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="outline" onClick={() => router.back()}>
              이전 페이지
            </Button>
            <Link href="/" className={cn(buttonVariants())}>
              홈으로 이동
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
