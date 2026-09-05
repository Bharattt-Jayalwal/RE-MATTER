export function estimateDepositCredit(weightKg: number, ratePerKg = 18): number {
  if (!Number.isFinite(weightKg) || weightKg <= 0) return 0;
  return Math.round(weightKg * ratePerKg);
}

export function getPickupStatus(fillLevel: number, threshold = 85): "monitoring" | "pickup-triggered" {
  return fillLevel >= threshold ? "pickup-triggered" : "monitoring";
}

export function calculateContribution({ sale, collection, processing, testing, logistics }: { sale: number; collection: number; processing: number; testing: number; logistics: number }): number {
  return sale - collection - processing - testing - logistics;
}
