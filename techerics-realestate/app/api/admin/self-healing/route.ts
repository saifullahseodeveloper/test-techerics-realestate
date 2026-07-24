import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { runSelfHealingWebsiteAudit } from "@/lib/ai-self-healing-engine";

// GET: Fetch all audits & recommendations
export async function GET() {
  try {
    const audits = await prisma.aiOptimizationAudit.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json({ success: true, audits });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch audits" }, { status: 500 });
  }
}

// POST: Run full site-wide audit & self-healing scan
export async function POST() {
  try {
    const summary = await runSelfHealingWebsiteAudit();
    return NextResponse.json({ success: true, summary });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to run audit" }, { status: 500 });
  }
}

// PATCH: Approve, Reject, or Toggle Field Lock
export async function PATCH(req: Request) {
  try {
    const { auditId, action } = await req.json();

    const audit = await prisma.aiOptimizationAudit.findUnique({ where: { id: auditId } });
    if (!audit) {
      return NextResponse.json({ error: "Audit record not found" }, { status: 404 });
    }

    if (action === "approve") {
      // Apply suggested value to property if propertyId exists
      if (audit.propertyId) {
        if (audit.type.includes("TITLE")) {
          await prisma.property.update({
            where: { id: audit.propertyId },
            data: { metaTitle: audit.suggestedValue },
          });
        } else if (audit.type.includes("REWRITE")) {
          await prisma.property.update({
            where: { id: audit.propertyId },
            data: { description: audit.suggestedValue },
          });
        }
      }

      const updated = await prisma.aiOptimizationAudit.update({
        where: { id: auditId },
        data: { status: "APPROVED" },
      });
      return NextResponse.json({ success: true, audit: updated });
    }

    if (action === "reject") {
      const updated = await prisma.aiOptimizationAudit.update({
        where: { id: auditId },
        data: { status: "REJECTED" },
      });
      return NextResponse.json({ success: true, audit: updated });
    }

    if (action === "toggleLock") {
      const updated = await prisma.aiOptimizationAudit.update({
        where: { id: auditId },
        data: { isLocked: !audit.isLocked },
      });
      return NextResponse.json({ success: true, audit: updated });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to process approval" }, { status: 500 });
  }
}
