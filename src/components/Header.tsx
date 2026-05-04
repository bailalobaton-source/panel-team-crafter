"use client";

import { removeToken } from "@/utils/authUtils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

// Iconos
import {
  LuLayoutDashboard,
  LuFiles,
  LuBell,
  LuMessageSquare,
  LuTicket,
  LuFlag,
  LuSettings,
  LuLogOut,
  LuChevronDown,
  LuX,
  LuMenu,
  LuPlay,
} from "react-icons/lu";

const menuItems = [
  { name: "Inicio", href: "/dashboard", icon: <LuLayoutDashboard /> },
  { name: "Clases", href: "/dashboard/clases", icon: <LuPlay /> },
  { name: "Recursos", href: "/dashboard/recursos", icon: <LuFiles /> },
  {
    name: "Notificaciones",
    href: "/dashboard/notificaciones",
    icon: <LuBell />,
  },
  { name: "Foros", href: "/dashboard/foros", icon: <LuMessageSquare /> },
  { name: "Descuentos", href: "/dashboard/descuentos", icon: <LuTicket /> },
  { name: "Banners", href: "/dashboard/banner", icon: <LuFlag /> },
  { name: "Suscripciones", href: "/dashboard/suscripciones", icon: <LuFlag /> },
  { name: "Usuarios", href: "/dashboard/usuarios", icon: <LuFlag /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openSettings, setOpenSettings] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (pathname.includes("/dashboard/ajustes")) setOpenSettings(true);
    setIsMobileOpen(false);
  }, [pathname]);

  const isSettingsActive = pathname.includes("/dashboard/ajustes");

  return (
    <>
      {/* BOTÓN HAMBURGUESA PARA MÓVILES */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2.5 bg-slate-900 text-white rounded-lg shadow-md border border-cyan-500/30"
      >
        <LuMenu className="text-xl" />
      </button>

      {/* OVERLAY MÓVIL */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* ASIDE PRINCIPAL (DARK MODE CON ACENTOS DE MARCA) */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 w-[280px] h-screen bg-slate-950 border-r border-slate-900 flex flex-col transition-transform duration-300 ease-in-out shadow-2xl
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* LOGO AREA */}
        <div className="h-28 flex items-center justify-between px-6 border-b border-slate-800/50 shrink-0 bg-slate-950">
          {/* Contenedor del logo con un brillo sutil detrás */}
          <div className="relative p-2 w-full flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 blur-xl rounded-full" />
            <Image
              src="/img/logo.png"
              alt="Team Crafter Web Logo"
              height={80}
              width={160}
              priority
              className="w-32 object-contain relative z-10 drop-shadow-md"
            />
          </div>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden absolute right-4 p-2 text-slate-400 hover:text-pink-400 bg-slate-900 rounded-md"
          >
            <LuX className="text-xl" />
          </button>
        </div>

        {/* NAVEGACIÓN */}
        <nav className="flex-1 overflow-y-auto py-6 custom-scrollbar text-slate-300">
          <ul className="flex flex-col space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative flex items-center gap-3 px-6 py-3 transition-all duration-200 text-[14px] font-medium group
                    ${
                      isActive
                        ? "bg-gradient-to-r from-pink-500/10 to-transparent text-pink-400"
                        : "hover:bg-slate-900 hover:text-cyan-300"
                    }`}
                  >
                    {/* Borde indicador activo con degradado Cyan -> Rosa */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-cyan-400 to-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.4)] rounded-r-full" />
                    )}

                    <span
                      className={`text-[18px] transition-transform duration-300 ${isActive ? "text-cyan-400" : "text-slate-500 group-hover:scale-110 group-hover:text-pink-400"}`}
                    >
                      {item.icon}
                    </span>
                    <span className="tracking-wide">{item.name}</span>
                  </Link>
                </li>
              );
            })}

            <li className="my-4 border-b border-slate-800/50 mx-4" />

            {/* AJUSTES DESPLEGABLE */}
            <li>
              <button
                onClick={() => setOpenSettings(!openSettings)}
                className={`relative w-full flex items-center justify-between px-6 py-3 transition-colors duration-200 text-[14px] font-medium group
                ${isSettingsActive ? "bg-gradient-to-r from-pink-500/10 to-transparent text-pink-400" : "hover:bg-slate-900 hover:text-cyan-300"}`}
              >
                {isSettingsActive && !openSettings && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-cyan-400 to-pink-500 rounded-r-full" />
                )}

                <div className="flex items-center gap-3">
                  <LuSettings
                    className={`text-[18px] transition-transform ${isSettingsActive ? "text-cyan-400 rotate-90" : "text-slate-500 group-hover:rotate-90 group-hover:text-pink-400"}`}
                  />
                  <span className="tracking-wide">Ajustes</span>
                </div>
                <LuChevronDown
                  className={`transition-transform duration-300 text-slate-500 ${openSettings ? "rotate-180 text-pink-400" : "group-hover:text-cyan-300"}`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${openSettings ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <ul className="flex flex-col bg-slate-900/40 py-2">
                  {[
                    {
                      name: "Categorías y Tips",
                      href: "/dashboard/ajustes/categorias-tips",
                    },
                    {
                      name: "Tipos de Recursos",
                      href: "/dashboard/ajustes/categorias-tipos-recursos",
                    },
                  ].map((sub) => (
                    <li key={sub.href}>
                      <Link
                        href={sub.href}
                        className={`block py-2.5 pl-14 pr-4 text-[13px] transition-colors
                        ${pathname === sub.href ? "text-yellow-300 font-semibold" : "text-slate-400 hover:text-cyan-300"}`}
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </nav>

        {/* CERRAR SESIÓN */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 mt-auto">
          <button
            onClick={() => {
              removeToken();
              window.location.reload();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-slate-400 border border-slate-800 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/50 transition-all text-sm font-medium"
          >
            <LuLogOut className="text-[18px]" />
            Cerrar Sesión
          </button>
        </div>
      </aside>
    </>
  );
}
