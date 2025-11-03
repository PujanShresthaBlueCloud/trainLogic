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
      {/* <h2 className="dark:bg-darkHeroBg md:text-50 text-36 rounded-lg lg:text-start text-primary max-w-max">
        trAInedLogic
      </h2> */}
        {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col hover:scale-105 transition-transform duration-200"
          >
            <div className="flex items-center text-xl font-bold">
              <span className="text-[#1A202C]">TR</span>
              <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] bg-clip-text text-transparent">[AI]</span>
              <span className="text-[#1A202C]">NED</span>
            </div>
            <div className="text-xs font-semibold tracking-widest text-[#1A202C]">LOGIC</div>
          </button>
    </Link>
  );
};

export default Logo;
