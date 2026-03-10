import axios from 'axios';

export async function scrapeAntigravity() {
  const scraperUrl = process.env.SCRAPER_API_URL || "http://localhost:5000";
  try {
    const res = await axios.get(`${scraperUrl}/api/scrape/antigravity`);
    return res.data;
  } catch (error) {
    console.error("Antigravity proxy scrape failed:", error);
    throw error;
  }
}
