import "./App.css";
import DrinkPannel from "./components/DrinkPannel";
import PaymentSelection from "./components/PaymentSelection";
import { AVAILABLE_DRINKS } from "./constants";

function App() {
  return (
    <main>
      <DrinkPannel availableDrinks={AVAILABLE_DRINKS} />
      <PaymentSelection />
      {/* Cash Selection*/}
      <section>
        <h2>현금</h2>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <select defaultValue="">
            <option value="" disabled>
              금액선택
            </option>
            <option>100</option>
            <option>500</option>
            <option>1000</option>
            <option>5000</option>
            <option>10000</option>
          </select>
          <h3>잔액 : 0 원</h3>
        </div>
      </section>
      {/* User */}
      <section>
        <h2>구매한 음료</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div>Empty</div>
          <button>초기화</button>
        </div>
      </section>
    </main>
  );
}

export default App;
