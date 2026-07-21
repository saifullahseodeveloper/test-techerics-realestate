import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

// ONE-TIME SETUP ENDPOINT — creates the first admin user in the live DB.
// Protected by SEED_SECRET env var so only you can call it.
// After first use, DELETE this file and redeploy.

export async function GET(req: Request) {
  const secret = process.env.SEED_SECRET;
  const { searchParams } = new URL(req.url);

  // Require a secret token so random visitors can't create admin accounts
  if (!secret || searchParams.get("secret") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = process.env.SEED_ADMIN_EMAIL ?? "admin@techerics.com";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe123!";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ message: "Admin already exists", email });
  }

  const hashed = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: {
      email,
      password: hashed,
      name: "Tech Erics Admin",
      role: "SUPER_ADMIN",
    },
  });

  return NextResponse.json({
    success: true,
    message: "Admin user created successfully!",
    email,
    note: "Now delete this file (app/api/admin/seed-admin/route.ts) and redeploy.",
  });
}
