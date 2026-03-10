import { NextResponse } from 'next/server';
import { SubscriptionService } from '@/services/subscriptionService';
import { scrapeCursor } from '@/services/scrapers/cursor';
import { scrapeClaude } from '@/services/scrapers/claude';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ service: string }> }
) {
  const { service: serviceParam } = await params;
  const service = serviceParam.toLowerCase();

  try {
    let plans: unknown[] = [];

    if (service === 'cursor') {
      plans = (await scrapeCursor()) as unknown[];
    } else if (service === 'claude') {
      plans = (await scrapeClaude()) as unknown[];
    } else {
      return NextResponse.json(
        { error: `Unknown service: ${service}` },
        { status: 400 }
      );
    }

    const serviceLabel = service.charAt(0).toUpperCase() + service.slice(1);
    const validPlans = plans as { name: string; price: number; currency: string; interval: string }[];

    for (const plan of validPlans) {
      await SubscriptionService.upsertSubscription(serviceLabel, plan);
    }

    return NextResponse.json({ success: true, count: plans.length });

  } catch (error: unknown) {

    console.error(`Scrape Error (${service}):`, error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 500 }
    );
  }
}