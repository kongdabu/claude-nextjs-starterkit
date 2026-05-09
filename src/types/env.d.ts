declare namespace NodeJS {
  interface ProcessEnv {
    readonly DATABASE_URL: string;
    readonly NEXT_PUBLIC_APP_URL: string;
    readonly NODE_ENV: "development" | "production" | "test";
  }
}
