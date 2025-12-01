import { Toaster } from "sonner";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="light">
      <body className="bg-neutral-50">
        <Providers>
          {children}

          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
