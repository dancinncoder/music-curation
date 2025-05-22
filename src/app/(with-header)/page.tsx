import Image from "next/image";
import RecordIcon from "@/../../public/ui/record-icon.png";

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
        <div className="flex flex-col items-start">
          <button className="bg-amber-300 cursor-pointer">Login</button>
          <button className="bg-amber-600 cursor-pointer">
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
