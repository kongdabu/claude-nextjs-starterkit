import Link from "next/link";
import Header from "@/components/common/header";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowRight,
  Database,
  Layers,
  Shield,
  Zap,
  LayoutDashboard,
} from "lucide-react";

const TECH_STACK = [
  { label: "Next.js 15", variant: "default" as const },
  { label: "TypeScript", variant: "secondary" as const },
  { label: "Tailwind V4", variant: "secondary" as const },
  { label: "shadcn/ui", variant: "secondary" as const },
  { label: "TanStack Query", variant: "secondary" as const },
  { label: "Zustand", variant: "outline" as const },
  { label: "React Hook Form", variant: "outline" as const },
  { label: "Zod", variant: "outline" as const },
  { label: "date-fns", variant: "outline" as const },
  { label: "PostgreSQL", variant: "outline" as const },
];

const ARCHITECTURE_LAYERS = [
  { name: "Route Handler", desc: "route.ts — HTTP 진입점" },
  { name: "Controller", desc: "요청 파싱, 응답 직렬화" },
  { name: "Service", desc: "비즈니스 로직" },
  { name: "Repository", desc: "SQL 쿼리, DB 접근" },
];

const EXAMPLE_USERS = [
  { id: 1, name: "홍길동", email: "hong@example.com", status: "활성" },
  { id: 2, name: "김철수", email: "kim@example.com", status: "활성" },
  { id: 3, name: "이영희", email: "lee@example.com", status: "비활성" },
];

const API_RESPONSE_EXAMPLE = `// 성공 응답
{ "success": true, "data": { ... }, "message": "..." }

// 에러 응답
{ "success": false, "error": { "code": "NOT_FOUND", "message": "..." } }`;

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-12 space-y-12">
        {/* 히어로 */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Next.js Starter Kit
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            레이어드 아키텍처 기반의 Next.js 15 스타터킷입니다.
            반복적인 초기 세팅 없이 바로 개발을 시작하세요.
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {TECH_STACK.map((tech) => (
              <Badge key={tech.label} variant={tech.variant}>
                {tech.label}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link href="/dashboard" className={cn(buttonVariants({ variant: "default" }))}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              대시보드 보기
            </Link>
            <Link href="/login" className={cn(buttonVariants({ variant: "outline" }))}>
              로그인 예시
            </Link>
          </div>
        </section>

        <Separator />

        {/* 컴포넌트 계층 구조 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">컴포넌트 계층 구조</h2>
          </div>
          <div className="grid gap-2">
            {[
              { layer: "Layer 4", name: "Pages", desc: "HomePage · LoginPage · RegisterPage · DashboardPage · UsersPage", color: "bg-primary/10 border-primary/20" },
              { layer: "Layer 3", name: "Layouts", desc: "RootLayout · AuthLayout · DashboardLayout", color: "bg-blue-500/10 border-blue-500/20" },
              { layer: "Layer 2", name: "Feature Components", desc: "ThemeToggle · UserNav · AppSidebar · DashboardHeader", color: "bg-purple-500/10 border-purple-500/20" },
              { layer: "Layer 1", name: "shadcn/ui Primitives", desc: "Button · Form · Sidebar · Tabs · Select · Switch · Progress …", color: "bg-orange-500/10 border-orange-500/20" },
              { layer: "Layer 0", name: "Foundation", desc: "Providers · Zustand Stores · API Client · TanStack Query · Utils", color: "bg-green-500/10 border-green-500/20" },
            ].map((item) => (
              <div key={item.layer} className={`rounded-lg border p-3 ${item.color}`}>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="shrink-0 font-mono text-xs">{item.layer}</Badge>
                  <span className="font-medium text-sm">{item.name}</span>
                  <span className="text-xs text-muted-foreground hidden sm:block">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* API 레이어드 아키텍처 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">레이어드 아키텍처</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {ARCHITECTURE_LAYERS.map((layer, index) => (
              <Card key={layer.name} className="relative">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-primary">
                    {layer.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">{layer.desc}</p>
                </CardContent>
                {index < ARCHITECTURE_LAYERS.length - 1 && (
                  <ArrowRight className="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-muted-foreground sm:block" />
                )}
              </Card>
            ))}
          </div>
          <Alert>
            <Zap className="h-4 w-4" />
            <AlertTitle>폴더 구조</AlertTitle>
            <AlertDescription>
              <code className="text-xs">
                src/controllers/ → src/services/ → src/repositories/ → src/lib/db/
              </code>
            </AlertDescription>
          </Alert>
        </section>

        <Separator />

        {/* API 응답 포맷 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">API 응답 포맷</h2>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">ApiResponse&lt;T&gt;</CardTitle>
              <CardDescription>모든 API는 일관된 응답 형식을 사용합니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="rounded-md bg-muted p-4 text-xs overflow-x-auto">
                <code>{API_RESPONSE_EXAMPLE}</code>
              </pre>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* 컴포넌트 쇼케이스 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">컴포넌트 쇼케이스</h2>

          <Tabs defaultValue="buttons">
            <TabsList className="flex-wrap h-auto">
              <TabsTrigger value="buttons">Button / Badge</TabsTrigger>
              <TabsTrigger value="avatar">Avatar</TabsTrigger>
              <TabsTrigger value="switch">Switch / Progress</TabsTrigger>
              <TabsTrigger value="table">Table</TabsTrigger>
            </TabsList>

            <TabsContent value="buttons" className="mt-4 space-y-4">
              <Card>
                <CardHeader><CardTitle className="text-sm">Button Variants</CardTitle></CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Button>기본</Button>
                  <Button variant="secondary">보조</Button>
                  <Button variant="outline">외곽선</Button>
                  <Button variant="ghost">고스트</Button>
                  <Button variant="destructive">삭제</Button>
                  <Button disabled>비활성</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-sm">Badge Variants</CardTitle></CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Badge>기본</Badge>
                  <Badge variant="secondary">보조</Badge>
                  <Badge variant="outline">외곽선</Badge>
                  <Badge variant="destructive">위험</Badge>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="avatar" className="mt-4">
              <Card>
                <CardHeader><CardTitle className="text-sm">Avatar</CardTitle></CardHeader>
                <CardContent className="flex items-end gap-3">
                  <Avatar>
                    <AvatarFallback>홍</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>김</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-16 w-16">
                    <AvatarFallback>이</AvatarFallback>
                  </Avatar>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="switch" className="mt-4 space-y-4">
              <Card>
                <CardHeader><CardTitle className="text-sm">Switch</CardTitle></CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Switch id="sw1" defaultChecked />
                    <Label htmlFor="sw1">알림 활성화</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch id="sw2" />
                    <Label htmlFor="sw2">마케팅 수신 동의</Label>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-sm">Progress</CardTitle></CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <Progress value={33} />
                  <Progress value={66} />
                  <Progress value={100} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="table" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Table (User 예시)</CardTitle>
                  <CardDescription>GET /api/users 응답 데이터 예시</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16">ID</TableHead>
                        <TableHead>이름</TableHead>
                        <TableHead>이메일</TableHead>
                        <TableHead>상태</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {EXAMPLE_USERS.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-mono text-sm">{user.id}</TableCell>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell className="text-muted-foreground">{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.status === "활성" ? "default" : "secondary"}>
                              {user.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <Separator />

        {/* API 엔드포인트 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">API 엔드포인트</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>메서드</TableHead>
                    <TableHead>경로</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { method: "GET", path: "/api/users", desc: "사용자 목록 조회", variant: "secondary" as const },
                    { method: "POST", path: "/api/users", desc: "사용자 생성", variant: "default" as const },
                    { method: "GET", path: "/api/users/:id", desc: "사용자 단건 조회", variant: "secondary" as const },
                    { method: "PUT", path: "/api/users/:id", desc: "사용자 정보 수정", variant: "outline" as const },
                    { method: "DELETE", path: "/api/users/:id", desc: "사용자 삭제", variant: "destructive" as const },
                  ].map((api) => (
                    <TableRow key={`${api.method}-${api.path}`}>
                      <TableCell>
                        <Badge variant={api.variant} className="font-mono text-xs">
                          {api.method}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{api.path}</TableCell>
                      <TableCell className="text-muted-foreground">{api.desc}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        Next.js 15 Starter Kit — Next.js · TypeScript · Tailwind V4 · shadcn/ui · TanStack Query · Zustand · PostgreSQL
      </footer>
    </div>
  );
}
