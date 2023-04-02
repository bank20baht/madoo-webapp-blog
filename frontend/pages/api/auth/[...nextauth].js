import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60, // 1 days
  },
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
