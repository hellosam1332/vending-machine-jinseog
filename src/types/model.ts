export type Drink = {
  name: string;
  emoji: string;
  price: number;
};

export type PaymentMethod = "card" | "cash";

export type Cash = 100 | 500 | 1000 | 5000 | 10000;

export type CreditCardStatus = "pending" | "authorized" | "declined";
