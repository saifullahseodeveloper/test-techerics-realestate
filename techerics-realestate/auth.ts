import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { authRatelimit } from "@/lib/rate-limit";

// Auth.js v5 chosen (research-backed): unified auth() works across Server
// Components, Route Handlers, and middleware. JWT session strategy used
// (not database sessions) because we deploy on Vercel Edge — JWT avoids
// a DB round-trip on every request, which matters for a high-traffic
// SEO-first site where most pages are public/anonymous.
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login", error: "/admin/login" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        if (!credentials?.email || !credentials?.password) return null;

        // Brute-force protection: 5 attempts per 15 min per email, not per IP —
        // stops credential-stuffing on a single account even from many IPs.
        const { success } = await authRatelimit.limit(String(credentials.email));
        if (!success) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });
        if (!user) return null;

        const valid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );
        if (!valid) return null;

        return { id: user.id, email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role: string }).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
});
