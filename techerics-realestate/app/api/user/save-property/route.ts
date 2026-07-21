import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { propertyId, action } = await req.json();

    if (!propertyId) {
      return NextResponse.json({ error: "Property ID required" }, { status: 400 });
    }

    const userId = session.user.id as string;

    if (action === "save") {
      await prisma.savedProperty.upsert({
        where: {
          userId_propertyId: { userId, propertyId },
        },
        update: {},
        create: { userId, propertyId },
      });
      return NextResponse.json({ message: "Saved" });
    } else if (action === "unsave") {
      await prisma.savedProperty.delete({
        where: {
          userId_propertyId: { userId, propertyId },
        },
      });
      return NextResponse.json({ message: "Unsaved" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Save property error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
