import { createContext, ReactNode, useState } from "react";
import { Cash, Drink, PaymentMethod } from "../types/model";

type State = {
  purchasedDrinks: Drink[];
  cash: Record<Cash, number>;
  paymentMethod: PaymentMethod;
  addPurchasedDrinks: (item: Drink) => void;
  insertCash: (cash: Cash) => void;
  returnCash: () => Record<Cash, number>;
  setPaymentMethod: (method: PaymentMethod) => void;
};

const defaultState: State = {
  purchasedDrinks: [],
  cash: { 100: 0, 500: 0, 1000: 0, 5000: 0, 10000: 0 },
  paymentMethod: "cash",
  addPurchasedDrinks: () => {},
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
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    defaultState.paymentMethod
  );

  return (
    <VendingMachineContext.Provider
      value={{
        purchasedDrinks,
        cash,
        paymentMethod,
        addPurchasedDrinks: (item: Drink) =>
          setPurchasedDrinks((prev) => [...prev, item]),
        insertCash: (cash: Cash) =>
          setCash((prev) => ({
            ...prev,
            [cash]: prev[cash] + 1,
          })),
        returnCash: () => {
          const result = { ...cash };
          setCash({ 100: 0, 500: 0, 1000: 0, 5000: 0, 10000: 0 });
          return result;
        },
        setPaymentMethod: (method: PaymentMethod) => setPaymentMethod(method),
      }}
    >
      {children}
    </VendingMachineContext.Provider>
  );
};
