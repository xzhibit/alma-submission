import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })


import "./styles/globals.css";
import styles from "./styles/layout.module.css";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={montserrat.className}>
            <main className={styles.main}>{children}</main>
        </body>
      </html>
    </StoreProvider>
  );
}
