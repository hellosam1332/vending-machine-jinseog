import { createContext, ReactNode, useState } from "react";
import { Drink, PaymentMethod } from "../types/model";

type State = {
  purchasedDrinks: Drink[];
  balance: number;
  paymentMethod: PaymentMethod;
  addPurchasedDrinks: (item: Drink) => void;
  addBalance: (amount: number) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
};

const defaultState: State = {
  purchasedDrinks: [],
  balance: 0,
  paymentMethod: "cash",
  addPurchasedDrinks: () => {},
  addBalance: () => {},
  setPaymentMethod: () => {},
};

export const VendingMachineContext = createContext<State>(defaultState);

export const VendingMachineProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [purchasedDrinks, setPurchasedDrinks] = useState<Drink[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");

  return (
    <VendingMachineContext.Provider
      value={{
        purchasedDrinks,
        balance,
        paymentMethod,
        addPurchasedDrinks: (item: Drink) =>
          setPurchasedDrinks((prev) => [...prev, item]),
        addBalance: (amount: number) => setBalance((prev) => prev + amount),
        setPaymentMethod: (method: PaymentMethod) => setPaymentMethod(method),
      }}
    >
      {children}
    </VendingMachineContext.Provider>
  );
};
