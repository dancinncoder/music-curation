"use client";

import { signOut, useSession } from "next-auth/react";
import React from "react";

function SignOutBtn() {
  const { data: session } = useSession();

  // 초기 로딩 시, 랜더링되어야 할 Btn 컴포넌트
  // if (status === "loading") {
  //   return (
  //     <button
  //       onClick={() => signOut()}
  //       className="bg-amber-200 h-[10px] w-[50px] cursor-point"
  //     >
  //       Sign Out
  //     </button>
  //   );
  // }

  return (
    <>
      {session ? (
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-amber-200 h-[50px] w-[100px] cursor-pointer"
        >
          Sign Out
        </button>
      ) : (
        <p>
          서버에서 세션을 먼저 확인한 후, 컴포넌트 렌더링하는 지 확인(이 글자가
          먼저 나오면 서버쪽 세션 처리에 오류있을 수 있음)
        </p>
      )}
    </>
  );
}

export default SignOutBtn;
