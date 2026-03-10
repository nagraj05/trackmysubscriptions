import axios from 'axios';

export async function scrapeChatGPT() {
  const scraperUrl = process.env.SCRAPER_API_URL || "http://localhost:5000";
  try {
    const res = await axios.get(`${scraperUrl}/api/scrape/chatgpt`);
    return res.data;
  } catch (error) {
    console.error("ChatGPT proxy scrape failed:", error);
    throw error;
  }
}
