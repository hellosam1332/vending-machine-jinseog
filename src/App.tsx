import "./App.css";
import DrinkPannel from "./components/DrinkPannel";
import { AVAILABLE_DRINKS } from "./constants";

function App() {
  return (
    <main>
      <DrinkPannel availableDrinks={AVAILABLE_DRINKS} />
      {/* Payment Selection */}
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
            <input type="radio" />
            Cash
          </label>
          <label>
            <input type="radio" />
            Card
          </label>
          <button>잔액반환</button>
        </div>
      </section>
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
