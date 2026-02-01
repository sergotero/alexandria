import styles from "./main-layout.module.css";

function MainLayout({ children }) {
  return (
    <main className={styles["main-layout"]}>
      {children}
    </main>
  );
}

export default MainLayout;