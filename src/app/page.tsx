import Image from "next/image";
import img from "public/images/logo.jpg";

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-center w-full">
      <h1 className="text-8xl mb-5 text-center font-thin">Monitoring App</h1>
      <Image width={300} src={img} alt="image" />
    </div>
  );
}
