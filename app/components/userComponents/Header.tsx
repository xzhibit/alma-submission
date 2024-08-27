"use client";
import styles from "./UserComponents.module.css";
import Image from "next/image";

export const Header = () => {
    return (
      <div className={styles.header}>
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