import { useContext } from "react";
import { VendingMachineContext } from "../contexts/VendingMachineContext";
import { PaymentMethod, Cash } from "../types/model";

function PaymentPannel() {
  const { paymentMethod } = useContext(VendingMachineContext);
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
        {paymentMethod === "cash" ? <CashPannel /> : <CardPannel />}
      </div>
    </section>
  );
}

function CashPannel() {
  const cashOptions: Cash[] = [100, 500, 1000, 5000, 10000];

  return (
    <>
      <select defaultValue="" onChange={(e) => console.log(e.target.value)}>
        <option value="" disabled>
          금액선택
        </option>
        {cashOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <h3>잔액 : 0 원</h3>
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
