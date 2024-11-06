import { Cash } from "../types/model";

export const vendingMachineCalculator = {
  calculateRemainingCash: ({
    price,
    inserted,
    remaining,
  }: {
    price: number;
    inserted: Record<Cash, number>;
    remaining: Record<Cash, number>;
  }) => {
    const newInserted = { ...inserted };
    const newRemaining = { ...remaining };

    const insertedBalance = Object.entries(inserted).reduce(
      (acc, [key, value]) => acc + Number(key) * value,
      0
    );

    if (insertedBalance < price) {
      throw new Error("잔액이 부족합니다.");
    }

    let remainingPrice = price;

    // 낮은 금액부터 소비
    for (const unit of [100, 500, 1000, 5000, 10000] as Cash[]) {
      while (remainingPrice >= 0 && newInserted[unit] > 0) {
        newInserted[unit] -= 1;
        newRemaining[unit] += 1;
        remainingPrice -= unit;
      }
    }

    if (remainingPrice < 0) {
      // 높은 금액부터 반환
      for (const unit of [10000, 5000, 1000, 500, 100] as Cash[]) {
        while (remainingPrice < 0 && unit <= Math.abs(remainingPrice)) {
          newRemaining[unit] -= 1;
          newInserted[unit] += 1;
          remainingPrice += unit;
        }
      }
    }

    return {
      inserted: newInserted,
      remaining: newRemaining,
    };
  },
};
