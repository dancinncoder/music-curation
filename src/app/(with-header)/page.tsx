import Image from "next/image";
import RecordIcon from "@/../../public/ui/record-icon.png";
import AuthenticationBox from "@/components/AuthenticationBox";

export default function Landing() {
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
