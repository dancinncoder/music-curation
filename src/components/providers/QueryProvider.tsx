"use client";

import { ReactNode, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
  DehydratedState,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function QueryProvider({
  children,
  dehydratedState,
}: {
  children: ReactNode;
  dehydratedState: DehydratedState;
}) {
  // 객체 재 생성 방지
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {/* QueryClientProvider로 Context 제공 */}
      <HydrationBoundary state={dehydratedState}>
        {/* 서버에서 dehydrate()로 직렬화한 상태(dehydratedState)를 받아,클라이언트 측에서 React Query 캐시에 복구(hydrate).클라이언트에서 useQuery()로 동일한 쿼리 키를 사용할 때 자동으로 서버 캐시를 재사용함. */}
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
