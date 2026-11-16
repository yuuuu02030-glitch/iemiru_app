import { useEffect, useState } from "react";
import { Link } from "react-router";
import styles from "./TopPage.module.css";
import { houseColor } from "../constants/houseColor";

function TopPage() {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    fetch("/api/houses")
      .then((res) => res.json())
      .then((data) => setHouses(data));
  }, []);

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.siteTitle}>イエミル住宅総合展示場</h1>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.catchcopy}>
            8棟のモデルハウスを、
            <br />
            まとめて見に行こう。
          </p>
          <p className={styles.info}>営業時間 10:00〜17:00（水曜定休）</p>
          <p className={styles.info}>予約時間帯 10／11／13／14／15／16時</p>
        </section>

        <div className={styles.buttons}>
          <Link to="/reserve" className={styles.primaryButton}>
            来場予約する
          </Link>
          <Link to="/visit-record" className={styles.secondaryButton}>
            見学記録をつける
          </Link>
        </div>

        <section>
          <h2 className={styles.sectionTitle}>
            モデルハウス一覧（全{houses.length}棟）
          </h2>
          <ul className={styles.houseList}>
            {houses.map((house) => (
              <li key={house.houseId}>
                <article
                  className={styles.houseCard}
                  style={{ "--house-color": houseColor[house.houseId] }}
                >
                  <p className={styles.houseNo}>
                    No.{house.houseId} <span className={styles.dot}></span>{" "}
                    {house.companyName}
                  </p>
                  <h3 className={styles.houseName}>{house.houseName}</h3>
                  <p className={styles.description}>{house.description}</p>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className={styles.footer}>
        <small>© イエミル 住宅総合展示場</small>
        <Link to="/admin/login" className={styles.footerLink}>
          スタッフログイン
        </Link>
      </footer>
    </>
  );
}

export default TopPage;
