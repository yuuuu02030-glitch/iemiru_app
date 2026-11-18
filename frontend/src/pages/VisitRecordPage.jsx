import { useState } from "react";
import { Link } from "react-router";
import CustomerHeader from "../components/CustomerHeader";
import styles from "./VisitRecordPage.module.css";
import common from "../style/common.module.css";

function VisitRecordPage() {
  const [form, setForm] = useState({
    receptionNo: "",
    phone: "",
  });
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setMessage("");
    setNotice("");
    setErrors({});

    const body = {
      receptionNo: form.receptionNo || null,
      phone: form.phone || null,
    };

    try {
      const res = await fetch("/api/visit-records/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (res.ok) {
        setResult(data);
        setRecords(data.records);
      } else {
        setMessage(data.message);
        setErrors(data.errors || {});
      }
    } catch {
      setMessage("通信に失敗しました。時間をおいてもう一度お試しください");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setMessage("");
    setNotice("");
    setErrors({});

    const body = {
      receptionNo: form.receptionNo,
      phone: form.phone,
      records: records.map((r) => ({
        houseId: r.houseId,
        visited: r.visited,
        favorite: r.favorite,
      })),
    };

    try {
      const res = await fetch("/api/visit-records", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (res.ok) {
        setNotice(data.message);
      } else {
        setMessage(data.message);
        setErrors(data.errors || {});
      }
    } catch {
      setMessage("通信に失敗しました。時間をおいてもう一度お試しください");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleRecord = (houseId, key) => {
    setRecords(
      records.map((r) =>
        r.houseId === houseId ? { ...r, [key]: !r[key] } : r,
      ),
    );
  };

  return (
    <>
      <CustomerHeader title="見学記録" backTo="/" />

      <main className={styles.main}>
        {result ? (
          <form onSubmit={handleSave} className={styles.form}>
            <section className={styles.section}>
              <h2 className={styles.title}>{result.name} 様の見学記録</h2>
              <p className={styles.lead}>
                見た棟と、気に入った棟にチェックしてください。
              </p>
              {errors.records && (
                <p className={styles.error}>{errors.records}</p>
              )}

              <ul className={styles.recordList}>
                {records.map((record) => (
                  <li key={record.houseId} className={styles.recordCard}>
                    <p className={styles.recordName}>
                      No.{record.houseId} {record.companyName}（
                      {record.houseName}）
                      {record.wish && (
                        <span className={styles.wishBadge}>★見たい</span>
                      )}
                    </p>

                    <div className={styles.checks}>
                      <label className={styles.check}>
                        <input
                          type="checkbox"
                          checked={record.visited}
                          onChange={() =>
                            toggleRecord(record.houseId, "visited")
                          }
                        />
                        見た
                      </label>
                      <label className={styles.check}>
                        <input
                          type="checkbox"
                          checked={record.favorite}
                          onChange={() =>
                            toggleRecord(record.houseId, "favorite")
                          }
                        />
                        気に入った
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <button
              type="submit"
              className={common.primaryButton}
              disabled={submitting}
            >
              {submitting ? "送信中..." : "登録する"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <section className={styles.section}>
              <h2 className={styles.title}>予約の確認</h2>
              <p className={styles.lead}>
                予約完了画面に表示された受付番号と、
                <br />
                予約時の電話番号を入力してください。
              </p>

              <label className={styles.field}>
                受付番号
                {errors.receptionNo && (
                  <p className={styles.error}>{errors.receptionNo}</p>
                )}
                <input
                  type="text"
                  name="receptionNo"
                  value={form.receptionNo}
                  onChange={handleChange}
                  placeholder="例）1110-003"
                />
              </label>

              <label className={styles.field}>
                電話番号
                {errors.phone && <p className={styles.error}>{errors.phone}</p>}
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="例）09012345678"
                />
              </label>
            </section>

            <button
              type="submit"
              className={common.primaryButton}
              disabled={submitting}
            >
              {submitting ? "送信中..." : "確認する"}
            </button>
          </form>
        )}

        {message && <p className={styles.error}>{message}</p>}
        {notice && <p className={styles.notice}>{notice}</p>}
        <Link to="/" className={styles.backLink}>
          トップへ戻る
        </Link>
      </main>
    </>
  );
}

export default VisitRecordPage;
