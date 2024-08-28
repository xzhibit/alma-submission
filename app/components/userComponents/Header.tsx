"use client";
import { useRouter } from "next/navigation";
import styles from "./UserComponents.module.css";
import Image from "next/image";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from '@auth0/nextjs-auth0/client';

export const Header = () => {

  const { user, error, isLoading } = useUser();


  const dash = () => {
    router.push('/admin')
  }

  let button = <><a href="/api/auth/login" className={styles.loginLink}>Login</a></>;
  if (user) {
    button = <><a href="#!" onClick={dash} className={styles.dashboardLink}>Go to dashboard</a><a href="/api/auth/logout" className={styles.loginLink}>Logout</a></>
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