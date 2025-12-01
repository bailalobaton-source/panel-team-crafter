"use client";

import { removeToken } from "@/utils/authUtils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaDoorOpen, FaTicketAlt, FaVideo } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { PiFlagBannerFill } from "react-icons/pi";
import { SiFiles } from "react-icons/si";

const menuItems = [
  {
    name: "Clases",
    href: "/dashboard",
    icon: <FaVideo className="text-2xl" />,
  },
  {
    name: "Recursos",
    href: "/dashboard/recursos",
    icon: <SiFiles className="text-2xl" />,
  },
  {
    name: "Notificaciones",
    href: "/dashboard/notificaciones",
    icon: <IoMdNotifications className="text-2xl" />,
  },
  {
    name: "Descuento",
    href: "/dashboard/descuentos",
    icon: <FaTicketAlt className="text-2xl" />,
  },
  {
    name: "Banners",
    href: "/dashboard/banner",
    icon: <PiFlagBannerFill className="text-2xl" />,
  },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="min-w-[280px] w-[280px] h-screen overflow-y-auto bg-neutral-800  shadow-sm shadow-neutral-200 flex flex-col items-center py-10 border-1 border-neutral-800">
      <Image
        className="w-[100px]"
        src="/img/logo.png"
        alt="Logo"
        height={500}
        width={500}
        priority
      />

      <nav className="w-full h-full pt-10 ">
        <ul className="space-y-0.5">
          {menuItems.map((item) => (
            <li key={item.href} className="w-full">
              <Link
                href={item.href}
                className={`flex items-center gap-3 p-4 text-neutral-800 bg-white ${
                  pathname === item.href ? "bg-pink-300 font-semibold" : ""
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}

          <li
            className="w-full"
            onClick={() => {
              removeToken();
              window.location.reload(); // Corregido aquí
            }}
          >
            <button className="w-full flex items-center gap-3 p-4 text-white bg-red-500 hover:bg-red-600 ">
              <FaDoorOpen />
              <span>Cerrar Sesion</span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
