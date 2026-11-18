import styles from "./AdminHeader.module.css";

function AdminHeader({ roleLabel, onLogout }) {
  return (
    <header className={styles.header}>
      <p className={styles.title}>イエミル住宅総合展示場 管理画面</p>

      {roleLabel && (
        <div className={styles.user}>
          <span>{roleLabel}でログイン中</span>
          <button type="button" className={styles.logout} onClick={onLogout}>
            ログアウト
          </button>
        </div>
      )}
    </header>
  );
}

export default AdminHeader;
