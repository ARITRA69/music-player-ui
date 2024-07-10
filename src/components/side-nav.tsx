import Image from "next/image";

export const SideNav = () => {
  return (
    <div className="w-1/4 min-h-screen hidden md:flex flex-col justify-between p-10">
      <Image
        src="/app-logo.svg"
        alt="Samespace Player"
        width={100}
        height={100}
        className="w-40"
      />

      <Image
        src="/Profile.svg"
        alt="avatar"
        width={50}
        height={50}
        className="w-12"
      />
    </div>
  );
};
