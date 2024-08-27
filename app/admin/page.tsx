import { AdminSidebar } from "../components/admin/AdminSidebar";
import { Leads } from "../components/admin/Leads";
import styles from "./Admin.module.css"

export default function AdminPage() {
    return (
      <div className={styles.container}>
        <AdminSidebar />
        <Leads />
      </div>
    );
  }
  