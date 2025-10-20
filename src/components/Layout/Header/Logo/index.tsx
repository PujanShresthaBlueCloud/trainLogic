import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      {/* <Image
        src="/images/logo/logo.svg"
        alt="logo"
        width={160}
        height={50}
        quality={100}
        className="dark:hidden"
      /> */}

      {/* <Image
        src="/images/logo/logo1.svg"
        alt="logo"
        width={140}
        height={30}
        quality={100}
        className="hidden dark:block"
      /> */}
      <h2 className="dark:bg-darkHeroBg md:text-50 text-36 rounded-lg lg:text-start text-primary max-w-max">
        trAInedLogic
      </h2>
    </Link>
  );
};

export default Logo;
