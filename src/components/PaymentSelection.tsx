import { useContext } from "react";
import { VendingMachineContext } from "../contexts/VendingMachineContext";

function PaymentSelection() {
  const { balance, paymentMethod, setPaymentMethod } = useContext(
    VendingMachineContext
  );

  return (
    <section>
      <h2>결제</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <label>
          <input
            type="radio"
            checked={paymentMethod === "cash"}
            onChange={() => setPaymentMethod("cash")}
          />
          Cash
        </label>
        <label>
          <input
            type="radio"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
          />
          Card
        </label>
        <button disabled={balance === 0}>잔액반환</button>
      </div>
    </section>
  );
}

export default PaymentSelection;
