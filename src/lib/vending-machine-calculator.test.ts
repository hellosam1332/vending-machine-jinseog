import { describe, expect, it } from "vitest";
import { vendingMachineCalculator } from "./vending-machine-calculator";

describe("Vending Machine Calculator", () => {
  it("음료의 가격보다 투입된 금액이 적은 경우 에러를 던진다", () => {
    const price = 1300;
    const inserted = { 100: 1, 500: 1, 1000: 0, 5000: 0, 10000: 0 };
    const remaining = { 100: 10, 500: 10, 1000: 10, 5000: 10, 10000: 10 };

    expect(() =>
      vendingMachineCalculator.calculateRemainingCash({
        price,
        inserted,
        remaining,
      })
    ).toThrowError("잔액이 부족합니다.");
  });

  it("읍료 1300원 테스트 케이스", () => {
    const price = 1300;
    const inserted = { 100: 3, 500: 1, 1000: 1, 5000: 0, 10000: 0 };
    const remaining = { 100: 10, 500: 10, 1000: 10, 5000: 10, 10000: 10 };

    const result = vendingMachineCalculator.calculateRemainingCash({
      price,
      inserted,
      remaining,
    });

    expect(result.inserted).toEqual({
      100: 0,
      500: 1,
      1000: 0,
      5000: 0,
      10000: 0,
    });
    expect(result.remaining).toEqual({
      100: 13,
      500: 10,
      1000: 11,
      5000: 10,
      10000: 10,
    });
  });

  it("음료 1100원 테스트 케이스", () => {
    const price = 1100;
    const inserted = { 100: 1, 500: 2, 1000: 1, 5000: 0, 10000: 0 };
    const remaining = { 100: 10, 500: 10, 1000: 10, 5000: 10, 10000: 10 };

    const result = vendingMachineCalculator.calculateRemainingCash({
      price,
      inserted,
      remaining,
    });

    expect(result.inserted).toEqual({
      100: 0,
      500: 0,
      1000: 1,
      5000: 0,
      10000: 0,
    });
    expect(result.remaining).toEqual({
      100: 11,
      500: 12,
      1000: 10,
      5000: 10,
      10000: 10,
    });
  });

  it("음료 600원 테스트 케이스", () => {
    const price = 600;
    const inserted = { 100: 1, 500: 2, 1000: 0, 5000: 0, 10000: 0 };
    const remaining = { 100: 10, 500: 10, 1000: 10, 5000: 10, 10000: 10 };

    const result = vendingMachineCalculator.calculateRemainingCash({
      price,
      inserted,
      remaining,
    });

    expect(result.inserted).toEqual({
      100: 0,
      500: 1,
      1000: 0,
      5000: 0,
      10000: 0,
    });
    expect(result.remaining).toEqual({
      100: 11,
      500: 11,
      1000: 10,
      5000: 10,
      10000: 10,
    });
  });

  it("음료 700원 테스트 케이스", () => {
    const price = 700;
    const inserted = { 100: 1, 500: 2, 1000: 0, 5000: 0, 10000: 0 };
    const remaining = { 100: 10, 500: 10, 1000: 10, 5000: 10, 10000: 10 };

    const result = vendingMachineCalculator.calculateRemainingCash({
      price,
      inserted,
      remaining,
    });

    expect(result.inserted).toEqual({
      100: 4,
      500: 0,
      1000: 0,
      5000: 0,
      10000: 0,
    });
    expect(result.remaining).toEqual({
      100: 7,
      500: 12,
      1000: 10,
      5000: 10,
      10000: 10,
    });
  });

  it("투입된 금액이 많은 경우 작은 단위의 금액부터 소모한다", () => {
    const price = 1300;
    const inserted = { 100: 30, 500: 20, 1000: 10, 5000: 0, 10000: 0 };
    const remaining = { 100: 10, 500: 10, 1000: 10, 5000: 10, 10000: 10 };

    const result = vendingMachineCalculator.calculateRemainingCash({
      price,
      inserted,
      remaining,
    });

    expect(result.inserted).toEqual({
      100: 17,
      500: 20,
      1000: 10,
      5000: 0,
      10000: 0,
    });
    expect(result.remaining).toEqual({
      100: 23,
      500: 10,
      1000: 10,
      5000: 10,
      10000: 10,
    });
  });
});
