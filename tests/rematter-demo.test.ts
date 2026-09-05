import { describe, expect, it } from "vitest";

import { calculateContribution, estimateDepositCredit, getPickupStatus } from "../shared/rematter-demo";

describe("RE:MATTER demo domain helpers", () => {
  it("estimates credits only for positive, finite measured weight", () => {
    expect(estimateDepositCredit(1.8)).toBe(32);
    expect(estimateDepositCredit(0)).toBe(0);
    expect(estimateDepositCredit(-2)).toBe(0);
    expect(estimateDepositCredit(Number.NaN)).toBe(0);
  });

  it("triggers pickup at or above the configured pod threshold", () => {
    expect(getPickupStatus(84)).toBe("monitoring");
    expect(getPickupStatus(85)).toBe("pickup-triggered");
    expect(getPickupStatus(91, 90)).toBe("pickup-triggered");
  });

  it("keeps batch contribution calculation transparent", () => {
    expect(calculateContribution({ sale: 9200, collection: 1840, processing: 2760, testing: 920, logistics: 1380 })).toBe(2300);
  });
});
