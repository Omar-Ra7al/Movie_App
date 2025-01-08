// Next >>
import Link from "next/link";
// Components >>
import Logo from "@/app/components/shared/Logo";

// Models Interface >>
import NavItems from "../shared/NavItems";

const NavBar = () => {
  return (
    <div
      className="fixed bottom-0 left-0 w-full h-20 z-50 flex justify-center gap-x-4 
      transtion duration-300
    sm:block sm:top-0 sm:w-20  sm:h-screen  bg-main pt-6 px-4">
      <Link className="hidden sm:block mb-8" href="/" aria-label="home">
        <Logo />
      </Link>
      <nav>
        <NavItems />
      </nav>
    </div>
  );
};

export default NavBar;
