import { useContext, useState } from "react";
import { VendingMachineContext } from "../contexts/VendingMachineContext";
import { PaymentMethod, Cash } from "../types/model";

function PaymentPannel() {
  const { insertedCash, paymentMethod, insertCash } = useContext(
    VendingMachineContext
  );

  const balance = Object.entries(insertedCash).reduce(
    (acc, [key, value]) => acc + Number(key) * value,
    0
  );

  return (
    <section>
      <h2>{PAYMENT_TITLE[paymentMethod]}</h2>
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {paymentMethod === "cash" ? (
          <CashPannel
            balance={balance}
            onInsertCash={(cash: Cash) => insertCash(cash)}
          />
        ) : (
          <CardPannel />
        )}
      </div>
    </section>
  );
}

function CashPannel({
  balance,
  onInsertCash,
}: {
  balance: number;
  onInsertCash: (cash: Cash) => void;
}) {
  const [selectedCash, setSelectedCash] = useState("");
  const cashOptions: Cash[] = [100, 500, 1000, 5000, 10000];

  return (
    <>
      <select
        value={selectedCash}
        onChange={(e) => {
          onInsertCash(e.target.value as unknown as Cash);
          setSelectedCash("");
        }}
      >
        <option value="" disabled>
          금액선택
        </option>
        {cashOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <h3>잔액 : {balance.toLocaleString()} 원</h3>
    </>
  );
}

function CardPannel() {
  return (
    <>
      <h3>카드 상태: 승인중</h3>
    </>
  );
}

const PAYMENT_TITLE: Record<PaymentMethod, string> = {
  card: "카드",
  cash: "현금",
} as const;

export default PaymentPannel;
