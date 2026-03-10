import { chromium } from "playwright";

export async function scrapeCursor() {
  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.route("**/*.{png,jpg,jpeg,gif,webp,woff,woff2}", (route) =>
      route.abort()
    );

    await page.goto("https://cursor.com/pricing", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    await page.waitForSelector("h3", { timeout: 10000 });

    const plans = await page.evaluate(() => {
      const results = [];
      const seenPlans = new Set();

      // Try specific card selector first, fall back to heading-based
      let cards = Array.from(document.querySelectorAll("a.card"));

      // Fallback: find by headings if no cards found
      if (cards.length === 0) {
        const headings = Array.from(document.querySelectorAll("h3"));
        cards = headings.map((h) => {
          let container = h;
          for (let i = 0; i < 5; i++) {
            if (container.parentElement) container = container.parentElement;
          }
          return container;
        });
      }

      cards.forEach((card) => {
        const h3 = card.querySelector("h3");
        if (!h3) return;

        const planName = h3.innerText?.trim();
        if (!planName || seenPlans.has(planName)) return;

        const allText = card.innerText || "";

        let price = 0;
        if (
          allText.toLowerCase().includes("free") &&
          !allText.includes("$")
        ) {
          price = 0;
        } else {
          // Match first price like $20, $40/mo, etc.
          const match = allText.match(/\$(\d+(?:\.\d+)?)/);
          price = match ? parseFloat(match[1]) : 0;
        }

        results.push({
          plan_name: planName,
          price,
          currency: "USD",
          interval: "monthly",
        });

        seenPlans.add(planName);
      });

      return results;
    });

    return plans.filter((p) => p.plan_name);
  } catch (error) {
    console.error("Cursor scraping failed:", error);
    throw error;
  } finally {
    if (browser) await browser.close();
  }
}