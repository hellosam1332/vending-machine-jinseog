import { createContext, ReactNode, useState } from "react";
import { Cash, CreditCardStatus, Drink, PaymentMethod } from "../types/model";
import { vendingMachineCalculator } from "../lib/vending-machine-calculator";

type State = {
  purchasedDrinks: Drink[];
  insertedCash: Record<Cash, number>;
  cash: Record<Cash, number>;
  paymentMethod: PaymentMethod;
  creditCard: {
    status: CreditCardStatus;
  };
  purchaseDrink: (drink: Drink) => void;
  insertCash: (cash: Cash) => void;
  returnCash: () => Record<Cash, number>;
  setPaymentMethod: (method: PaymentMethod) => void;
  reset: () => void;
};

const defaultState: State = {
  purchasedDrinks: [],
  insertedCash: { 100: 0, 500: 0, 1000: 0, 5000: 0, 10000: 0 },
  cash: { 100: 999, 500: 999, 1000: 999, 5000: 999, 10000: 999 },
  paymentMethod: "cash",
  creditCard: {
    status: "pending",
  },
  purchaseDrink: () => {},
  insertCash: () => {},
  returnCash: () => ({ 100: 0, 500: 0, 1000: 0, 5000: 0, 10000: 0 }),
  setPaymentMethod: () => {},
  reset: () => {},
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
  const [creditCard, setCreditCard] = useState(defaultState.creditCard);

  const purchaseWithCash = (drink: Drink) => {
    const { inserted, remaining } =
      vendingMachineCalculator.calculateRemainingCash({
        price: drink.price,
        inserted: insertedCash,
        remaining: cash,
      });

    setInsertedCash(inserted);
    setCash(remaining);
  };

  const purchaseWithCard = async (drink: Drink) => {
    setCreditCard({ status: "pending" });
    return await new Promise((res) =>
      setTimeout(() => {
        setCreditCard({ status: "authorized" });
        return res(`카드 ${drink.price}원 결제 완료`);
      }, 2000)
    );
  };

  return (
    <VendingMachineContext.Provider
      value={{
        purchasedDrinks,
        cash,
        insertedCash,
        paymentMethod,
        creditCard,
        purchaseDrink: (drink: Drink) => {
          try {
            switch (paymentMethod) {
              case "cash":
                purchaseWithCash(drink);
                setPurchasedDrinks((prev) => [...prev, drink]);
                break;
              case "card":
                purchaseWithCard(drink).then((message) => {
                  alert(message);
                  setPurchasedDrinks((prev) => [...prev, drink]);
                });
                break;
              default:
                throw new Error("결제 수단을 선택해주세요.");
            }
          } catch (error) {
            alert(error);
          }
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
        setPaymentMethod: (method: PaymentMethod) => {
          if (method === "card") {
            const balance = Object.entries(insertedCash).reduce(
              (acc, [key, value]) => acc + Number(key) * value,
              0
            );

            if (balance > 0) {
              alert("카드 결제는 잔액이 0원일 때만 가능합니다.");
              return;
            }

            setCreditCard({ status: "pending" });

            new Promise((res) =>
              setTimeout(() => {
                setCreditCard({ status: "authorized" });

                return res("카드 승인 완료");
              }, 2000)
            );
          }

          setPaymentMethod(method);
        },
        reset: () => {
          setPurchasedDrinks(defaultState.purchasedDrinks);
          setCash(defaultState.cash);
          setInsertedCash(defaultState.insertedCash);
          setPaymentMethod(defaultState.paymentMethod);
        },
      }}
    >
      {children}
    </VendingMachineContext.Provider>
  );
};
