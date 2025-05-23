import Image from "next/image";
import RecordIcon from "@/../../public/ui/record-icon.png";
import AuthenticationBox from "@/components/AuthenticationBox";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const session = await getServerSession(authOptions);
  console.log("LandingPage session:", session);
  if (session) {
    // 로그인 되어 있으면 대시보드로 이동
    redirect("/dashboard");
  }
  return (
    <div>
      <div>
        <Image
          src={RecordIcon}
          className="w-[161px] h-[161px]"
          alt="Picture of the author"
          priority
        />
        <p>
          Review, Rank, Share <br /> your fav musics!
        </p>
        <AuthenticationBox />
      </div>
    </div>
  );
}
