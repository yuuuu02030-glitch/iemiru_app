import { Navigate, useLocation, Link } from "react-router";
import { formatDatetime } from "../utils/formatDate";
import CustomerHeader from "../components/CustomerHeader";
import styles from "../ReserveCompletePage.module.css";
import common from "../style/common.module.css";

function ReserveCompletePage() {
  const location = useLocation();
  const data = location.state;

  if (!data) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <CustomerHeader title={"予約完了"} backTo={"/"} />

      <main className={styles.main}>
        <div className={styles.checkIcon} aria-hidden="true">
          ✓
        </div>

        <h2 className={styles.message}>ご予約ありがとうございます</h2>

        <section className={styles.receptionBox}>
          <p className={styles.receptionLabel}>受付番号</p>
          <p className={styles.receptionNo}>{data.receptionNo}</p>
        </section>
        <section className={styles.datetime}>
          <p>来場日時：{formatDatetime(data.visitDatetime)}</p>
        </section>

        <p className={styles.note}>
          受付番号は、当日の見学記録の登録に使います。
          <br />
          スクリーンショットで保存してください。
        </p>

        <Link to="/visit-record" className={common.primaryButton}>
          見学記録をつける
        </Link>

        <Link to="/" className={styles.backLink}>
          トップへ戻る
        </Link>
      </main>
    </>
  );
}

export default ReserveCompletePage;
