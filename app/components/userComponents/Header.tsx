"use client";
import { useRouter } from "next/navigation";
import styles from "./UserComponents.module.css";
import Image from "next/image";

import { useSession, getSession } from "next-auth/react"

export const Header = () => {
  const { data: session, status } = useSession()
  const login = () => {
    router.push('/api/auth/signin');
  }
  const dash = () => {
    router.push('/admin')
  }

  let button = <><button className={styles.loginLink} onClick={login}>Login</button></>;
  if (status === "authenticated") {
    button = <><button className={styles.loginLink} onClick={dash}>Go to dashboard</button></>;
  }


  const router = useRouter();
  return (
      <div className={styles.header}>
        {button}
        
        <Image
                src="/alma-logo.png"
                className={styles.logo}
                alt="logo"
                width={76}
                height={28}
              />        
        <p className={styles.heading}>Get An Assessment <br /> Of Your Immigration Case</p>
    </div>
    );
}