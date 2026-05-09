# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 개발 명령어

```bash
npm run dev      # Turbopack 개발 서버 실행
npm run build    # Turbopack 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 실행
```

테스트 프레임워크는 설정되어 있지 않음.

DB 초기화:
```bash
psql $DATABASE_URL -f src/lib/db/schema.sql
```

## 경로 별칭

`@/*` → `src/*` (tsconfig.json에 설정됨)

## 프로젝트 구조

```
src/
├── app/
│   ├── (auth)/                        # 인증 라우트 그룹 (중앙 정렬 레이아웃)
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/                   # 대시보드 라우트 그룹 (사이드바 레이아웃)
│   │   ├── layout.tsx
│   │   └── dashboard/
│   │       ├── page.tsx
│   │       └── users/page.tsx
│   ├── api/
│   │   ├── auth/login/route.ts        # POST /api/auth/login
│   │   └── users/
│   │       ├── route.ts               # GET /api/users, POST /api/users
│   │       └── [id]/route.ts          # GET/PUT/DELETE /api/users/:id
│   ├── error/page.tsx                 # 에러 리다이렉트 페이지
│   ├── error.tsx                      # 에러 바운더리
│   ├── global-error.tsx
│   ├── not-found.tsx
│   ├── layout.tsx                     # 루트 레이아웃 (Providers 주입)
│   ├── page.tsx                       # 홈 쇼케이스 페이지
│   └── globals.css                    # Tailwind v4 전역 스타일
│
├── components/
│   ├── common/                        # Feature 컴포넌트 (Layer 2)
│   │   ├── app-sidebar.tsx            # 대시보드 사이드바 (네비게이션)
│   │   ├── dashboard-header.tsx       # 대시보드 상단 헤더
│   │   ├── header.tsx                 # 공개 페이지 헤더
│   │   ├── theme-toggle.tsx           # 다크/라이트/시스템 토글
│   │   └── user-nav.tsx               # 유저 드롭다운 메뉴
│   ├── providers.tsx                  # 전역 Provider 통합 (클라이언트)
│   └── ui/                            # shadcn/ui 컴포넌트 (Layer 1, 수정 금지)
│
├── controllers/                       # 요청 파싱, Zod 검증, 응답 직렬화
│   ├── auth.controller.ts
│   └── user.controller.ts
│
├── dto/                               # Zod 스키마 + TypeScript 타입
│   ├── auth.dto.ts                    # loginSchema, registerSchema
│   └── user.dto.ts                    # createUserSchema, UserResponseDto
│
├── hooks/
│   ├── use-api.ts                     # TanStack Query 래퍼 (useFetch, usePost, usePut, useDelete)
│   └── use-mobile.ts                  # 모바일 감지 훅
│
├── lib/
│   ├── api-client.ts                  # fetch 기반 API 클라이언트 (get/post/put/del)
│   ├── db/
│   │   ├── index.ts                   # pg Pool, query<T>(), withTransaction()
│   │   └── schema.sql                 # users 테이블 DDL
│   ├── format.ts                      # date-fns 날짜 포맷 유틸
│   ├── query-client.ts                # TanStack QueryClient 설정
│   └── utils.ts                       # cn(), successResponse(), errorResponse()
│
├── repositories/                      # SQL 쿼리 (parameterized)
│   └── user.repository.ts             # findAll, findById, findByEmail, create, update, delete
│
├── services/                          # 비즈니스 로직
│   ├── auth.service.ts
│   └── user.service.ts
│
├── store/                             # Zustand 전역 상태
│   ├── auth.store.ts                  # 인증 상태 (sessionStorage persist)
│   └── ui.store.ts                    # UI 상태 (isLoading 등)
│
└── types/
    ├── api.ts                         # ApiResponse<T>, ErrorCode
    └── env.d.ts                       # process.env 타입 보강
```

## 아키텍처

### 컴포넌트 계층 (아래 → 위 의존)

```
Layer 0: Foundation       src/components/providers.tsx, src/store/, src/lib/, src/hooks/
Layer 1: shadcn/ui        src/components/ui/   (@base-ui/react 기반, @radix-ui 아님)
Layer 2: Feature          src/components/common/   (ThemeToggle, AppSidebar, UserNav, DashboardHeader)
Layer 3: Layouts          src/app/layout.tsx, (auth)/layout.tsx, (dashboard)/layout.tsx
Layer 4: Pages            src/app/(auth)/, src/app/(dashboard)/
```

### API 레이어드 아키텍처

```
src/app/api/[resource]/route.ts          → HTTP 진입점 (Next.js Route Handler)
src/controllers/[resource].controller.ts → 요청 파싱, Zod 검증, 응답 직렬화
src/services/[resource].service.ts       → 비즈니스 로직, 에러 코드 throw
src/repositories/[resource].repository.ts → SQL 쿼리 (parameterized)
src/lib/db/index.ts                      → pg Pool, query<T>(), withTransaction()
```

새 리소스 추가 시 `src/app/api/users/`, `src/controllers/user.controller.ts` 패턴 참고.

## UI 라이브러리 주의사항

이 프로젝트는 shadcn `base-nova` 스타일 사용. `@radix-ui` 대신 `@base-ui/react`를 사용함.

- `asChild` prop 없음 → `render` prop 사용:
  ```tsx
  // ❌ <TooltipTrigger asChild><Button /></TooltipTrigger>
  // ✅
  <TooltipTrigger render={<Button onClick={handler} />}>내용</TooltipTrigger>
  ```
- Link에 button 스타일 적용 시 `buttonVariants` 유틸 사용:
  ```tsx
  import { buttonVariants } from "@/components/ui/button";
  <Link href="/path" className={cn(buttonVariants({ variant: "outline" }))}>텍스트</Link>
  ```
- shadcn 컴포넌트 추가: `npx shadcn@latest add [component]`

## 서버/클라이언트 경계

- `src/app/layout.tsx` (서버) → `<Providers>` (클라이언트) 로 위임
- `Providers`는 ThemeProvider + QueryClientProvider + TooltipProvider + Toaster 통합
- `ThemeToggle`은 하이드레이션 불일치 방지를 위해 `mounted` 전에는 `"system"` 기본값 사용

## API 응답 형식

모든 엔드포인트는 `src/types/api.ts`의 `ApiResponse<T>` 형식을 따름:

```typescript
{ success: boolean; data?: T; message?: string; error?: { code: string; message: string } }
```

에러 코드: `NOT_FOUND`, `VALIDATION_ERROR`, `INTERNAL_ERROR`, `UNAUTHORIZED`, `FORBIDDEN`, `CONFLICT`

서비스 레이어에서 에러 코드 문자열을 `throw new Error("NOT_FOUND")` 형태로 throw하면, 컨트롤러가 HTTP 상태 코드로 매핑. `src/lib/utils.ts`의 `successResponse()`, `errorResponse()` 헬퍼 사용.

## 클라이언트 데이터 페칭

`src/hooks/use-api.ts`의 TanStack Query 래퍼 훅 사용:

```typescript
// 조회
const { data, isLoading, isError } = useFetch<User[]>(["users"], "/api/users");
const users = data?.data ?? [];

// 생성 (성공 시 queryKey 자동 무효화)
const createMutation = usePost<User, CreateUserDto>("/api/users", ["users"]);
await createMutation.mutateAsync(body);

// 수정
const updateMutation = usePut<User, UpdateDto>((id) => `/api/users/${id}`, ["users"]);
await updateMutation.mutateAsync({ id, body });

// 삭제
const deleteMutation = useDelete<User>((id) => `/api/users/${id}`, ["users"]);
await deleteMutation.mutateAsync(id);
```

페이지에서 직접 `apiClient.post/get/...` 호출 시에는 `res.success` 체크로 에러 처리.

## DTO & 검증

`src/dto/`에 Zod 스키마 정의. 컨트롤러에서 `safeParse()`로 검증 후 서비스 호출.

```typescript
export const createUserSchema = z.object({ ... });
export const updateUserSchema = createUserSchema.partial();
export type CreateUserDto = z.infer<typeof createUserSchema>;
```

폼에서는 `src/components/ui/form.tsx`의 shadcn Form 컴포넌트 + `zodResolver` 사용:
```tsx
const form = useForm<Dto>({ resolver: zodResolver(schema) });
// FormField → FormItem → FormLabel + FormControl(Input) + FormMessage
```

## 상태 관리

- **서버 상태**: TanStack Query (`src/hooks/use-api.ts`)
- **인증 상태**: Zustand (`src/store/auth.store.ts`) — sessionStorage persist, SSR 안전
- **UI 상태**: Zustand (`src/store/ui.store.ts`)

## 데이터베이스

`src/lib/db/index.ts`의 `query<T>(sql, params)` 사용. 항상 parameterized query 사용.

트랜잭션: `withTransaction(async (client) => { ... })`. 리포지토리에 `createWithClient(client, ...)` 메서드 추가.

DB 스키마: `src/lib/db/schema.sql`

## 라우트 그룹 구조

- `(auth)` — 로그인/회원가입. 중앙 정렬 레이아웃, 헤더 없음
- `(dashboard)` — 인증 후 영역. SidebarProvider + AppSidebar + DashboardHeader 레이아웃
- 나머지 — 공개 페이지. 홈 쇼케이스 Header 포함

## 유틸리티

- `src/lib/format.ts` — date-fns 기반 날짜 포맷 (`formatDate`, `formatDateTime`, `formatRelative`, 한국어 로케일)
- `src/lib/utils.ts` — `cn()` (Tailwind 클래스 병합), `successResponse()`, `errorResponse()`

## Next.js 15 주의사항

dynamic route params는 반드시 `await` 필요:

```typescript
type Params = Promise<{ id: string }>;
export async function GET(req: Request, { params }: { params: Params }) {
  const { id } = await params;
}
```
