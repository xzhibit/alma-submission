"use client";
import styles from "./Login.module.css";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { useState } from "react";

export default function Login() {
    const router = useRouter()
    const goHome = () => {
        router.push("/");
    }

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const login = async () => {
        let response = await fetch("/api/auth/csrf");
        let csrf = await response.json();
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("csrfToken", csrf["csrfToken"]);

        response = await fetch("/api/auth/signin?csrf=true", {
            method: "POST",
            body: formData
        });
        let data = await response.json();
        console.log(data);
    }
    return (
        <div className={styles.thankyou_container}>
            <Image
                src="/alma-logo.png"
                height={40}
                width={125}
                alt="logo"
            />
            <h1 className={styles.loginTitle}>Login</h1>
            <input type="text" className={styles.blockInput} value={username} onChange={(e) => {const target = e.target as HTMLInputElement; setUsername(target.value)}} placeholder="Username" />
            <input type="password" className={styles.blockInput} value={password} onChange={(e) => {const target = e.target as HTMLInputElement; setPassword(target.value)}} placeholder="Password" />
            
            
            <button onClick={login} className={styles.btn}>Login</button>
            <button onClick={goHome} className={styles.btn}>Cancel</button>
        </div>
    )
}