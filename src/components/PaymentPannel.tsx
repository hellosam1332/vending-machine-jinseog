import { useContext, useState } from "react";
import { VendingMachineContext } from "../contexts/VendingMachineContext";
import { PaymentMethod, Cash, CreditCardStatus } from "../types/model";

function PaymentPannel() {
  const { insertedCash, paymentMethod, insertCash, creditCard } = useContext(
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
          <CardPannel status={creditCard.status} />
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

function CardPannel({ status }: { status: CreditCardStatus }) {
  return (
    <>
      <h3>카드 상태: {CREATE_CARD_STATUS[status]}</h3>
    </>
  );
}

const PAYMENT_TITLE: Record<PaymentMethod, string> = {
  card: "카드",
  cash: "현금",
} as const;

const CREATE_CARD_STATUS: Record<CreditCardStatus, string> = {
  pending: "승인 대기 중",
  authorized: "승인 완료",
  declined: "승인 거부",
} as const;

export default PaymentPannel;
