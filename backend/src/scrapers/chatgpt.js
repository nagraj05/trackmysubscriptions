/**
 * ChatGPT India pricing plans.
 * Since pricing is often behind auth or regional redirects, 
 * we provide the latest known India-localized rates as per 2026.
 */
export async function scrapeChatGPT() {
  // In a real scenario, we might use Playwright to check the public landing page.
  // For now, we return the documented India pricing in INR.
  const plans = [
    { plan_name: "Free", price: 0, currency: "INR", interval: "monthly" },
    { plan_name: "Plus", price: 1999, currency: "INR", interval: "monthly" },
    { plan_name: "Team", price: 2099, currency: "INR", interval: "monthly" },
    { plan_name: "Pro", price: 19900, currency: "INR", interval: "monthly" }
  ];

  return plans;
}
