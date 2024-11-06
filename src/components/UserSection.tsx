import { useContext } from "react";
import { VendingMachineContext } from "../contexts/VendingMachineContext";

function UserSection() {
  const { purchasedDrinks, reset } = useContext(VendingMachineContext);

  const DrinksWithCount = purchasedDrinks.reduce((acc, drink) => {
    if (acc[drink.name]) {
      acc[drink.name] += 1;
    } else {
      acc[drink.name] = 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <section>
      <h2>구매한 음료</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {purchasedDrinks.length > 0 ? (
          <ul
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              padding: 0,
              listStyle: "none",
            }}
          >
            {Object.entries(DrinksWithCount).map(([name, count]) => (
              <li key={name}>
                <h3>{`${name}`}</h3>
                <span>수량: {count}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div>Empty</div>
        )}
        <button type="button" onClick={reset}>
          초기화
        </button>
      </div>
    </section>
  );
}

export default UserSection;
