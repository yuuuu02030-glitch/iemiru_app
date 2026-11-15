import { useEffect, useState } from "react";
import { Link } from "react-router";

function TopPage() {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    fetch("/api/houses")
      .then((res) => res.json())
      .then((data) => setHouses(data));
  }, []);

  return (
    <div>
      <h1>イエミル住宅総合展示場</h1>

      <h2>8棟のモデルハウスを、まとめて見に行こう。</h2>
      <p>営業時間 10:00~17:00(水曜定休日)</p>
      <p>予約時間帯 10 / 11 / 13 / 14 / 15 / 16時</p>

      <Link to="/reserve">来場予約する</Link>

      <Link to="/visit-record">見学記録をつける</Link>

      <ul>
        {houses.map((house) => (
          <li key={house.houseId}>
            No.{house.houseId} {house.companyName}「{house.houseName}」
          </li>
        ))}
      </ul>

      <small>&copy; 2026 イエミル 住宅総合展示場 All Rights Reserved.</small>
      <Link>スタッフログイン</Link>
    </div>
  );
}

export default TopPage;
