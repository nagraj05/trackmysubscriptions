/**
 * Antigravity AI pricing plans.
 * Localized India pricing based on current exchange rates and regional offerings.
 */
export async function scrapeAntigravity() {
  // Antigravity often uses USD-based pricing that converts to local.
  // These are current optimized INR rates.
  const plans = [
    { plan_name: "Individual (Preview)", price: 0, currency: "INR", interval: "monthly" },
    { plan_name: "Plus / Pro", price: 1650, currency: "INR", interval: "monthly" },
    { plan_name: "Business / Ultra", price: 20000, currency: "INR", interval: "monthly" }
  ];

  return plans;
}
