import axios from 'axios';

export async function scrapeClaude() {
  const scraperUrl = process.env.SCRAPER_API_URL || "https://tractmysubscriptions.onrender.com";
  try {
    const res = await axios.get(`${scraperUrl}/api/scrape/claude`);
    return res.data;
  } catch (error) {
    console.error("Claude proxy scrape failed:", error);
    throw error;
  }
}
