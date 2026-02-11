export function calculatePeriodConsumption(current: number, previous?: number | null): number {
  if (previous == null) return 0;
  return current - previous;
}

export function calculateInvoiceAmount(waterCostPerM3: number, waterPeriodCost: number, periodConsumption: number): number {
  return waterCostPerM3 * periodConsumption + waterPeriodCost;
}
