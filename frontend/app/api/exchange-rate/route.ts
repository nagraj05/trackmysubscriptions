import { NextResponse } from 'next/server';
import axios from 'axios';

interface FrankfurterResponse {
  rates: Record<string, number>;
  base: string;
  date: string;
}

export async function GET() {
  try {
    const response = await axios.get<FrankfurterResponse>('https://api.frankfurter.app/latest?from=USD&to=INR');
    
    if (response.data?.rates?.INR) {
      return NextResponse.json({ rate: response.data.rates.INR });
    }
    
    throw new Error('Invalid response from exchange rate API');
  } catch (error) {
    console.error("Exchange rate fetch failed:", error);
    return NextResponse.json({ rate: 83.0 });
  }
}