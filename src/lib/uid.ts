import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

// 서버컴포넌트에서 데이터 fetch
export async function getUid() {
  const session = await getServerSession(authOptions);

  // app_user.uid === session.user.id
  const uid = session?.user?.id;
  if (!uid) {
    console.log("getUid 에서 session id 없음");
    return null;
  }

  return uid;
}
