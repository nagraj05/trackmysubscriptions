import { chromium } from "playwright";

export async function scrapeClaude() {
  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // Required for Render
    });

    const page = await browser.newPage();

    // Block images/fonts to speed up scraping
    await page.route("**/*.{png,jpg,jpeg,gif,webp,woff,woff2}", (route) =>
      route.abort()
    );

    await page.goto("https://claude.ai/pricing", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    // Wait for any element that looks like a price to appear
    await page.waitForSelector("body", { timeout: 10000 });
    await page.waitForTimeout(3000);

    const plans = await page.evaluate(() => {
      const results = [];
      const seenPlans = new Set();

      // Dump all text content by heading to find plan sections
      const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4"));

      const validPlans = ["Free", "Pro", "Max"];

      headings.forEach((heading) => {
        const planName = heading.innerText?.trim();
        if (!validPlans.includes(planName)) return;
        if (seenPlans.has(planName)) return;

        // Walk up to find the containing card, then grab all its text
        let container = heading;
        for (let i = 0; i < 5; i++) {
          if (container.parentElement) container = container.parentElement;
        }

        const allText = container.innerText || "";

        // Extract price using regex — more robust than hardcoded includes
        let price = 0;
        if (planName !== "Free") {
          // Match patterns like "$20", "$100", "$17"
          const priceMatches = allText.match(/\$(\d+)/g);
          if (priceMatches && priceMatches.length > 0) {
            // Take the first (usually monthly) price
            price = parseInt(priceMatches[0].replace("$", ""), 10);
          }
        }

        results.push({
          name: planName,
          price,
          currency: "USD",
          interval: "monthly",
        });

        seenPlans.add(planName);
      });

      return results;
    });

    return plans.filter((p) => p.name && (p.price > 0 || p.name === "Free"));
  } catch (error) {
    console.error("Claude scraping failed:", error);
    throw error;
  } finally {
    if (browser) await browser.close(); // Always closes, even on error
  }
}