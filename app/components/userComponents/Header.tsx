"use client";
import { useRouter } from "next/navigation";
import styles from "./UserComponents.module.css";
import Image from "next/image";

export const Header = () => {
  const router = useRouter();
  const login = () => {
    router.push('/login')
  }
    return (
      <div className={styles.header}>
        <button className={styles.loginLink} onClick={login}>Login</button>
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