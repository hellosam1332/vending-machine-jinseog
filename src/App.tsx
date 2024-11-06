import "./App.css";
import DrinkPannel from "./components/DrinkPannel";
import PaymentPannel from "./components/PaymentPannel";
import PaymentSelection from "./components/PaymentSelection";
import UserSection from "./components/UserSection";
import { AVAILABLE_DRINKS } from "./constants";

function App() {
  return (
    <main>
      <DrinkPannel availableDrinks={AVAILABLE_DRINKS} />
      <PaymentSelection />
      {/* Cash Selection*/}
      <PaymentPannel />
      {/* User */}
      <UserSection />
    </main>
  );
}

export default App;
