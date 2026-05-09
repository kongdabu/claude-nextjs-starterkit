"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("[Error Boundary]", error.digest ?? "unknown");
    router.replace("/error");
  }, [error, router]);

  // reset은 미사용이지만 Next.js 15 타입 요구사항으로 선언 유지
  void reset;

  return null;
}
