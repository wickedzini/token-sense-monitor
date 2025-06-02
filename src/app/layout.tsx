// src/app/layout.tsx
"use client";
import "./globals.css";
import { Inter, Space_Grotesk } from 'next/font/google'
// Usunięto import Navbar
// import { Navbar } from "@/components/layout/Navbar";
import { Providers } from '@/providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Dodano suppressHydrationWarning i język
    <html lang="en" suppressHydrationWarning={true}>
      {/* Dodano klasy fontów do body */}
      <body className={inter.className}>
        {/* Owinięto zawartość Providers */}
        <Providers>
          {/* Usunięto Navbar */}
          {/* <Navbar /> */}
          {children}
        </Providers>
      </body>
    </html>
  );
}

// "use client";
// import "./globals.css";
// import { Inter, Space_Grotesk } from 'next/font/google'
// import { Navbar } from "@/components/layout/Navbar";
// import { Providers } from '@/providers';

// const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
// const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });



// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         {children}
//       </body>
//     </html>
//   );
// }
