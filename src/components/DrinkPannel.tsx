import { useContext, useMemo } from "react";
import { Drink } from "../types/model";
import { VendingMachineContext } from "../contexts/VendingMachineContext";

type Props = {
  availableDrinks: Drink[];
};

function DrinkPannel({ availableDrinks }: Props) {
  const { insertedCash, paymentMethod, purchaseDrink, creditCard } = useContext(
    VendingMachineContext
  );

  const balance = useMemo(
    () =>
      Object.entries(insertedCash).reduce(
        (acc, [key, value]) => acc + Number(key) * value,
        0
      ),
    [insertedCash]
  );

  return (
    <section>
      <h2>음료선택</h2>
      <ul
        style={{
          display: "flex",
          gap: "10px",
          padding: 0,
          listStyle: "none",
        }}
      >
        {availableDrinks.map((drink) => (
          <li key={drink.name}>
            <h3>{`${drink.name} ${drink.emoji}`}</h3>
            <p>가격: {drink.price.toLocaleString()}</p>
            <button
              type="button"
              disabled={
                (paymentMethod === "cash" && balance < drink.price) ||
                (paymentMethod === "card" && creditCard.status === "pending")
              }
              onClick={() => purchaseDrink(drink)}
            >
              Get!
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default DrinkPannel;
