"use client";
import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { Montserrat } from 'next/font/google'
import { useSession, getSession, SessionProvider } from "next-auth/react";
import { Auth0Provider } from '@auth0/auth0-react';
const montserrat = Montserrat({ subsets: ['latin'] })
import { UserProvider } from '@auth0/nextjs-auth0/client';


import "./styles/globals.css";
import styles from "./styles/layout.module.css";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <SessionProvider>

      <html lang="en">
        <body className={montserrat.className}>
          <UserProvider>
            <main className={styles.main}>{children}</main>
          </UserProvider>
        </body>
      </html>

      </SessionProvider>
    </StoreProvider>
  );
}
