import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


async function login(credentials) {
  try {
    const response = await fetch(
      "https://partneruat-backend.paymentsave.co.uk/api/v1/auth/login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );

    const data = await response.json();

    if (data.status === 'success') {
      // cookie.set("access_token", data.data.token, { expires: 7, path: "/" });
      return data;
    }
  } catch (error) {
    console.error("An error occurred during sign-in:", error);
  }
}

export const authOptions = {
  pages: {
    signIn: "authentication/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          console.log("error", error);
          throw new Error('Failed to log in')
          // return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.data.email;
        token.id = user.data.id;
        token.token = user.data.token;
      }
      // console.log('token :>> ', token);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.email = token.email;
        session.user.id = token.id;
        session.user.token = token.token;
      }
      // console.log('session :>> ', session);
      return session;
    },
    async redirect({ baseUrl, }) {
     
      // if(session){
        return baseUrl; // Redirect to the home page after successful login
      // }
      
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
