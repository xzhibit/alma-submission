"use client";

import styles from "../../admin/Admin.module.css"
import Image from "next/image";
import { useRouter } from "next/navigation";

export const AdminSidebar = () => {  
    const router = useRouter();

    const home = () => {
        router.push("/")
    }
    return (
        <div className={styles.sidebar}>
            <div className={styles.topGroup}>
                <Image 
                    width={125}
                    height={40}
                    src="/alma-logo.png"
                    alt="logo"
                />
                <ul className={styles.sidebarmenu}>
                    <li className={styles.menuItem}><a href="#!" className={styles.menuActive}>Leads</a></li>
                    <li className={styles.menuItem}><a href="#!">Settings</a></li>
                    <li className={styles.menuItem}><a href="#!" onClick={home}>Home</a></li>
                </ul>
            </div>
            <div className={styles.bottomGroup}>
                <div className={styles.adminIcon}>A</div>
                <div className={styles.adminName}>Admin</div>
            </div>
        </div>
    )
}