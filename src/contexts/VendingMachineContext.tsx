import { createContext, ReactNode, useState } from "react";
import { Cash, Drink, PaymentMethod } from "../types/model";
import { vendingMachineCalculator } from "../lib/vending-machine-calculator";

type State = {
  purchasedDrinks: Drink[];
  insertedCash: Record<Cash, number>;
  cash: Record<Cash, number>;
  paymentMethod: PaymentMethod;
  purchaseDrink: (drink: Drink) => void;
  insertCash: (cash: Cash) => void;
  returnCash: () => Record<Cash, number>;
  setPaymentMethod: (method: PaymentMethod) => void;
};

const defaultState: State = {
  purchasedDrinks: [],
  insertedCash: { 100: 0, 500: 0, 1000: 0, 5000: 0, 10000: 0 },
  cash: { 100: 999, 500: 999, 1000: 999, 5000: 999, 10000: 999 },
  paymentMethod: "cash",
  purchaseDrink: () => {},
  insertCash: () => {},
  returnCash: () => ({ 100: 0, 500: 0, 1000: 0, 5000: 0, 10000: 0 }),
  setPaymentMethod: () => {},
};

export const VendingMachineContext = createContext<State>(defaultState);

export const VendingMachineProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [purchasedDrinks, setPurchasedDrinks] = useState<Drink[]>(
    defaultState.purchasedDrinks
  );
  const [cash, setCash] = useState<Record<Cash, number>>(defaultState.cash);
  const [insertedCash, setInsertedCash] = useState<Record<Cash, number>>(
    defaultState.insertedCash
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    defaultState.paymentMethod
  );

  return (
    <VendingMachineContext.Provider
      value={{
        purchasedDrinks,
        cash,
        insertedCash,
        paymentMethod,
        purchaseDrink: (drink: Drink) => {
          if (paymentMethod === "cash") {
            const { inserted, remaining } =
              vendingMachineCalculator.calculateRemainingCash({
                price: drink.price,
                inserted: insertedCash,
                remaining: cash,
              });

            setInsertedCash(inserted);
            setCash(remaining);
          }

          setPurchasedDrinks((prev) => [...prev, drink]);
        },

        insertCash: (cash: Cash) =>
          setInsertedCash((prev) => ({
            ...prev,
            [cash]: prev[cash] + 1,
          })),
        returnCash: () => {
          const result = { ...insertedCash };
          setInsertedCash({ 100: 0, 500: 0, 1000: 0, 5000: 0, 10000: 0 });
          return result;
        },
        setPaymentMethod: (method: PaymentMethod) => setPaymentMethod(method),
      }}
    >
      {children}
    </VendingMachineContext.Provider>
  );
};
