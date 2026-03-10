import axios from 'axios';

export async function scrapeCursor() {
  const scraperUrl = process.env.SCRAPER_API_URL || "https://tractmysubscriptions.onrender.com";
  try {
    const res = await axios.get(`${scraperUrl}/api/scrape/cursor`);
    return res.data;
  } catch (error) {
    console.error("Cursor proxy scrape failed:", error);
    throw error;
  }
}
