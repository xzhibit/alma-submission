import { AdminSidebar } from "./AdminSidebar";
import { Leads } from "./Leads";
import styles from "../../admin/Admin.module.css"
import { useSession, getSession } from "next-auth/react"
import { useRouter } from "next/navigation";
export const AdminPage  = () => {
  const router = useRouter();
  const { data: session, status } = useSession()

  if (status === "authenticated") {
    return (
      <div className={styles.container}>
          <AdminSidebar />
          <Leads />
        </div>
      );
    }
    return (
      <><h1>Access denied.</h1> <a href="#" onClick={() => {router.push("/")}}>Go back to home</a></>
    )
} 