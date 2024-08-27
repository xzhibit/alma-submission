"use client";

import styles from "../../admin/Admin.module.css"
import Image from "next/image";

export const AdminSidebar = () => {
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
                </ul>
            </div>
            <div className={styles.bottomGroup}>
                <div className={styles.adminIcon}>A</div>
                <div className={styles.adminName}>Admin</div>
            </div>
        </div>
    )
}