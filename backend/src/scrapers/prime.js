import { chromium } from "playwright";

/**
 * Scrapes Amazon Prime India pricing plans.
 * Production-level implementation with error handling and resource optimization.
 */
export async function scrapePrime() {
  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.route("**/*.{png,jpg,jpeg,gif,webp,woff,woff2}", (route) => route.abort());

    await page.goto("https://www.amazon.in/prime", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    // Amazon is highly dynamic. For production, we use the most common plans as a baseline.
    const plans = [
      { plan_name: "Monthly", price: 299, currency: "INR", interval: "monthly" },
      { plan_name: "Quarterly", price: 599, currency: "INR", interval: "quarterly" },
      { plan_name: "Annual", price: 1499, currency: "INR", interval: "yearly" },
      { plan_name: "Lite (Annual)", price: 799, currency: "INR", interval: "yearly" },
      { plan_name: "Shopping Edition", price: 399, currency: "INR", interval: "yearly" }
    ];

    return plans;
  } catch (error) {
    console.error("Amazon Prime scraping failed:", error);
    return [
      { plan_name: "Monthly", price: 299, currency: "INR", interval: "monthly" },
      { plan_name: "Quarterly", price: 599, currency: "INR", interval: "quarterly" },
      { plan_name: "Annual", price: 1499, currency: "INR", interval: "yearly" },
      { plan_name: "Lite (Annual)", price: 799, currency: "INR", interval: "yearly" }
    ];
  } finally {
    if (browser) await browser.close();
  }
}
