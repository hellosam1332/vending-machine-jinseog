import "./App.css";
import DrinkPannel from "./components/DrinkPannel";
import PaymentPannel from "./components/PaymentPannel";
import PaymentSelection from "./components/PaymentSelection";
import { AVAILABLE_DRINKS } from "./constants";

function App() {
  return (
    <main>
      <DrinkPannel availableDrinks={AVAILABLE_DRINKS} />
      <PaymentSelection />
      {/* Cash Selection*/}
      <PaymentPannel />
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
