import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // next-auth JWT 토큰 가져오기 (세션 역할)
  const token = await getToken({ req, secret });

  const sessionExists = !!token;

  // 인증 필요 경로
  const protectedPaths = ["/dashboard", "/setting"];

  if (
    !sessionExists &&
    protectedPaths.some((path) => pathname.startsWith(path))
  ) {
    // 세션 없으면 홈으로 리다이렉트
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (sessionExists && pathname === "/") {
    // 세션 있으면 /dashboard로 리다이렉트
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// 적용 경로 제한 (필요에 따라 조정)
export const config = {
  matcher: ["/", "/dashboard", "/setting"],
};

// import { NextRequest, NextResponse } from "next/server";

// // 세션 확인 함수 - 예: 쿠키 기반 세션 확인
// function hasSession(req: NextRequest): boolean {
//   // 예시: 'session' 쿠키가 있으면 세션 존재로 판단
//   return !!req.cookies.get("session");
// }

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   const sessionExists = hasSession(req);

//   // 세션 없을 때 /dashboard, /setting 접근하면 /로 리다이렉트
//   if (
//     !sessionExists &&
//     (pathname === "/dashboard" || pathname === "/setting")
//   ) {
//     const url = req.nextUrl.clone();
//     url.pathname = "/";
//     return NextResponse.redirect(url);
//   }

//   // 세션 있을 때 / 접근하면 /dashboard로 리다이렉트
//   if (sessionExists && pathname === "/") {
//     const url = req.nextUrl.clone();
//     url.pathname = "/dashboard";
//     return NextResponse.redirect(url);
//   }

//   // 기본적으로 요청 계속 진행
//   return NextResponse.next();
// }

// // 미들웨어가 적용될 경로 설정 (옵션)
// // root matcher 적용하면 프로젝트 모든 경로에서 작동하므로, 필요에 맞게 설정하세요.
// export const config = {
//   matcher: ["/", "/dashboard", "/setting"],
// };
