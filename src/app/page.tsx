import Image from "next/image";
import img from "@/assets/images/logo.jpg";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  return (
    <div className="flex mt-20 h-full flex-col items-center justify-center w-full">
      <h1 className="text-8xl mb-9 text-center font-thin">
        Sense Monitoring App
      </h1>
      <Image width={300} src={img} alt="image" />
    </div>
  );
}
