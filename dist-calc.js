function calculatePeriodConsumption(current, previous) {
  if (previous == null) return 0;
  return current - previous;
}
function calculateInvoiceAmount(waterCostPerM3, waterPeriodCost, periodConsumption) {
  return waterCostPerM3 * periodConsumption + waterPeriodCost;
}
module.exports = { calculatePeriodConsumption, calculateInvoiceAmount };
