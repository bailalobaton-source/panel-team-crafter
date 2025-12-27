"use client";

import { removeToken } from "@/utils/authUtils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

import { BsFillPostcardFill } from "react-icons/bs";
import { FaDoorOpen, FaTicketAlt, FaVideo } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
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
    name: "Foros",
    href: "/dashboard/foros",
    icon: <BsFillPostcardFill className="text-2xl" />,
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
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <header className="min-w-[280px] w-[280px] h-screen bg-pink-400 flex flex-col items-center py-10">
      <Image
        className="w-[100px]"
        src="/img/logo.png"
        alt="Logo"
        height={500}
        width={500}
        priority
      />

      <nav className="w-full h-full pt-10">
        <ul className="space-y-1 px-1">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 p-4 rounded-md  text-neutral-800
                ${
                  pathname === item.href
                    ? "bg-pink-200 font-semibold"
                    : "bg-white"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}

          {/* AJUSTES DESPLEGABLE */}
          <li className="bg-white rounded-md overflow-hidden">
            <button
              onClick={() => setOpenSettings(!openSettings)}
              className="w-full flex items-center justify-between p-4 text-neutral-800"
            >
              <div className="flex items-center gap-3">
                <IoSettings className="text-xl" />
                <span>Ajustes</span>
              </div>
              <BiChevronDown
                className={`transition-transform ${
                  openSettings ? "rotate-180" : ""
                }`}
              />
            </button>

            {openSettings && (
              <ul className={` bg-pink-400 space-y-0.5 pl-1 pt-0.5`}>
                <li>
                  <Link
                    href="/dashboard/ajustes/categorias-tips"
                    className={`flex items-center gap-3 p-4 rounded-md  text-neutral-800
                ${
                  pathname === "/dashboard/ajustes/perfil"
                    ? "bg-pink-200 font-semibold"
                    : "bg-white"
                }`}
                  >
                    Categorias y Tips
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/ajustes/seguridad"
                    className={`flex items-center gap-3 p-4 rounded-md  text-neutral-800
                ${
                  pathname === "/dashboard/ajustes/seguridad"
                    ? "bg-pink-200 font-semibold"
                    : "bg-white"
                }`}
                  >
                    Seguridad
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="p-2"></li>
          {/* CERRAR SESIÓN */}
          <li
            className="mt-4"
            onClick={() => {
              removeToken();
              window.location.reload();
            }}
          >
            <button className="w-full flex items-center gap-3 p-4 rounded-md text-white bg-rose-500 hover:bg-rose-600">
              <FaDoorOpen />
              <span>Cerrar sesión</span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
