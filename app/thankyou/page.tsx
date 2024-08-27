"use client";
import styles from "./ThankYou.module.css";
import Image from "next/image";

export default function ThankYou() {
    return (
        <div className={styles.thankyou_container}>
            <Image
                src="/info-icon.png"
                height={70}
                width={50}
                alt="Thank you for contacting us"
            />
            <p className={styles.form_title}>Thank You</p>
            <p className={styles.form_subtitle}>Your information was submitted to our team of immigration attorneys. Expect an email from hello@tryalma.ai.</p>
            <a href="/" className={styles.btn}>Go Back To Homepage</a>
        </div>
    )
}