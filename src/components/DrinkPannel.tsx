import { Drink } from "../types/model";

type Props = {
  availableDrinks: Drink[];
};

function DrinkPannel({ availableDrinks }: Props) {
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
        {availableDrinks.map(({ emoji, name, price }) => (
          <li key={name}>
            <h3>{`${name} ${emoji}`}</h3>
            <p>가격: {price.toLocaleString()}</p>
            <button>Get!</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default DrinkPannel;
