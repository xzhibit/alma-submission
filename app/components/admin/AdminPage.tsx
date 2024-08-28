import { AdminSidebar } from "./AdminSidebar";
import { Leads } from "./Leads";
import styles from "../../admin/Admin.module.css"
import { useRouter } from "next/navigation";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useState } from "react";



export const AdminPage  = () => {
  const { user, error, isLoading } = useUser();

  if (error) return <div>{error.message}</div>;

  const router = useRouter();
  
  const goHome = () => {
    router.push("/");
  }

  if (user) {
    return (
      <div className={styles.container}>
          <AdminSidebar />
          <Leads />
        </div>
      );
  } else {
    return <><h1>Access denied.</h1><a href="#" onClick={goHome}>Click here to go back.</a></>
  }

} 