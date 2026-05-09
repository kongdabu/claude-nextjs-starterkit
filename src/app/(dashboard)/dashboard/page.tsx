import { Users, Activity, TrendingUp, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const STAT_CARDS = [
  {
    title: "전체 사용자",
    value: "1,234",
    change: "+12%",
    icon: Users,
    description: "지난달 대비",
  },
  {
    title: "활성 세션",
    value: "89",
    change: "+5%",
    icon: Activity,
    description: "현재 접속 중",
  },
  {
    title: "월간 성장률",
    value: "18.2%",
    change: "+3.1%",
    icon: TrendingUp,
    description: "전월 대비",
  },
  {
    title: "총 주문",
    value: "573",
    change: "+8%",
    icon: ShoppingCart,
    description: "이번 달",
  },
] as const;

const RECENT_ACTIVITIES = [
  { user: "홍길동", action: "계정을 생성했습니다.", time: "2분 전", status: "신규" },
  { user: "김철수", action: "프로필을 업데이트했습니다.", time: "15분 전", status: "수정" },
  { user: "이영희", action: "비밀번호를 변경했습니다.", time: "1시간 전", status: "보안" },
  { user: "박민준", action: "계정이 비활성화되었습니다.", time: "3시간 전", status: "비활성" },
] as const;

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">대시보드</h2>
        <p className="text-muted-foreground">서비스 현황을 한눈에 확인하세요.</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STAT_CARDS.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">{stat.change}</span> {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 탭 콘텐츠 */}
      <Tabs defaultValue="activity">
        <TabsList>
          <TabsTrigger value="activity">최근 활동</TabsTrigger>
          <TabsTrigger value="loading">로딩 예시</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>최근 활동</CardTitle>
              <CardDescription>최근 사용자 활동 내역입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {RECENT_ACTIVITIES.map((item) => (
                  <div
                    key={item.user + item.time}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div>
                      <p className="text-sm font-medium">{item.user}</p>
                      <p className="text-xs text-muted-foreground">{item.action}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs">
                        {item.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loading" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Skeleton 로딩 예시</CardTitle>
              <CardDescription>데이터 로딩 중 표시하는 Skeleton 컴포넌트입니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
