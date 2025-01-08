"use client";
// Next.js >>
import Link from "next/link";
import { usePathname } from "next/navigation";
// React >>
import { cloneElement } from "react";
// Types >>
import { NavLinks } from "@/app/models/types";
// Icons >>
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdGroups } from "react-icons/md";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { BsFillGearFill } from "react-icons/bs";
// Components >>
import LogoutBtn from "../client/LogoutBtn";
import ThemeToggleButton from "../client/ToggleMode";

const NavItems = () => {
  const pathName = usePathname();
  const NAV_LINKS: NavLinks[] = [
    {
      label: "Home",
      href: "/",
      icon: <TbLayoutDashboardFilled />,
    },
    {
      label: "About",
      href: "/about",
      icon: <MdGroups />,
    },
    {
      label: "WishList",
      href: "/wishlist",
      icon: <BsFillBookmarkHeartFill />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <BsFillGearFill />,
    },
  ];

  return (
    <ul className="sm:block space-x-4 sm:space-y-4  sm:space-x-0  flex items-center  ">
      {NAV_LINKS.map((link, index) => (
        <li
          key={index}
          className={`${
            pathName === link.href && "bg-active border-none"
          } flex justify-center items-center rounded-2xl 
                border-2 border-secondary w-10 h-10 cursor-pointer
                hover:border-active transition duration-300
                `}>
          <Link
            href={link.href}
            aria-label={link.href}
            className="w-full h-full flex justify-center items-center p-3">
            {cloneElement(link.icon, {
              className: `${
                pathName === link.href ? "text-white" : "text-secondary"
              }`,
            })}
          </Link>
        </li>
      ))}
      <ThemeToggleButton />

      <LogoutBtn />
    </ul>
  );
};

export default NavItems;
