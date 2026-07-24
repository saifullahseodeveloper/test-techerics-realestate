import { NextResponse } from "next/server";
import { executeMasterAutonomousIngestion } from "@/lib/ai-master-engine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { targetUrl } = body;

    if (!targetUrl) {
      return NextResponse.json({ error: "targetUrl parameter is required" }, { status: 400 });
    }

    const result = await executeMasterAutonomousIngestion(targetUrl);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error("Master Autonomous Ingestion API Error:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
