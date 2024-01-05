// pages/api/auth.js
import { default as NextAuthMiddleware } from "next-auth/middleware";

export default async function handler(req, res) {
  try {
    await NextAuthMiddleware(req, res);
  } catch (error) {
    console.error("NextAuth Middleware Error:", error);
    res.status(500).end("Internal Server Error");
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
