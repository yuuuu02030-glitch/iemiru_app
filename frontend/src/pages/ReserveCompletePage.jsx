import { useLocation } from "react-router";

function ReserveCompletePage() {
  const location = useLocation();
  const data = location.state;

  return (
    <div>
      <h1>予約完了</h1>
      <p>受付番号：{data?.receptionNo}</p>
      <p>来場日時：{data?.visitDatetime}</p>
    </div>
  );
}

export default ReserveCompletePage;
