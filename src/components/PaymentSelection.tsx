import { useContext } from "react";
import { VendingMachineContext } from "../contexts/VendingMachineContext";

function PaymentSelection() {
  const { insertedCash, paymentMethod, setPaymentMethod, returnCash } =
    useContext(VendingMachineContext);

  const balance = Object.entries(insertedCash).reduce(
    (acc, [key, value]) => acc + Number(key) * value,
    0
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
        <button
          disabled={balance === 0}
          onClick={() => {
            const returned = returnCash();
            alert("반환된 잔액: " + JSON.stringify(returned));
          }}
        >
          잔액반환
        </button>
      </div>
    </section>
  );
}

export default PaymentSelection;
