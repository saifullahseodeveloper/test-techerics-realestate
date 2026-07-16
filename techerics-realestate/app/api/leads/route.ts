import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { leadsRatelimit, getClientIp } from "@/lib/rate-limit";

// Meta's official WhatsApp Cloud API — chosen over third-party wrappers
// (research confirms unofficial/web-scraping libraries get numbers banned).
// Uses an approved "utility" template since this is a business-initiated
// message to a new lead (outside the 24h customer-service window).
async function sendWhatsAppNotification(params: {
  agentPhone: string;
  leadName: string;
  leadPhone: string;
  propertyTitle: string;
}) {
  const { WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_ACCESS_TOKEN } = process.env;
  if (!WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_ACCESS_TOKEN) return;

  await fetch(
    `https://graph.facebook.com/v22.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: params.agentPhone,
        type: "template",
        template: {
          name: "new_lead_notification", // pre-approved template in WhatsApp Manager
          language: { code: "en" },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: params.leadName },
                { type: "text", text: params.leadPhone },
                { type: "text", text: params.propertyTitle },
              ],
            },
          ],
        },
      }),
    }
  );
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const { success, reset } = await leadsRatelimit.limit(ip);
  if (!success) {
    return NextResponse.json(
      { error: "Too many enquiries sent. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((reset - Date.now()) / 1000)) } }
    );
  }

  const body = await req.json();
  const { propertyId, name, phone, message } = body;

  if (!name || !phone) {
    return NextResponse.json({ error: "Name and phone required" }, { status: 400 });
  }

  const property = propertyId
    ? await prisma.property.findUnique({
        where: { id: propertyId },
        include: { agent: true },
      })
    : null;

  // 1) Dual capture: DB save first (source of truth even if WhatsApp fails)
  const lead = await prisma.lead.create({
    data: {
      propertyId: propertyId ?? undefined,
      name,
      phone,
      message,
      source: "WEBSITE_FORM",
    },
  });

  // 2) WhatsApp notification to the assigned agent (best-effort, non-blocking)
  if (property?.agent?.phone) {
    try {
      await sendWhatsAppNotification({
        agentPhone: property.agent.phone,
        leadName: name,
        leadPhone: phone,
        propertyTitle: property.title,
      });
      await prisma.lead.update({
        where: { id: lead.id },
        data: { whatsappSent: true },
      });
    } catch (err) {
      console.error("WhatsApp notification failed:", err);
    }
  }

  return NextResponse.json({ success: true, leadId: lead.id });
}
