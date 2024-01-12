import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import toast from "react-hot-toast";
import cookie from "js-cookie";
// import sql from '@vercel/postgres'
// async function login(credentials) {
//   try {
//     const response = await fetch(
//       `${process.env.REACT_APP_BASE_URL}api/v1/auth/login/`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(credentials),
//       }
//     )
//       .then(async (res) => {
//         if (res.data.status) {
//           const data = await response.json();
//           toast.success("Login successful", {
//             duration: 3000, // 3 seconds
//           });
//           return data;
//         }
//       })
//       .catch((err) => {
//         const message = JSON.parse(err.request.response).message;
//         const errorMsg = JSON.parse(err.request.response).errors;
//         for (let value of Object.values(errorMsg)) {
//           // showToast("error", value[0]);
//           toast.error(`Login failed: ${value[0]}`, {
//             duration: 3000, // 3 seconds
//           });
//         }
//       });

//     const data = await response.json();

//     if (data.status === "success") {
//       // cookie.set("access_token", data.data.token, { expires: 7, path: "/" });
//       return data;
//     }
//   } catch (error) {
//     console.error("An error occurred during sign-in:", error);
//   }
// }

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

    if (data.status === "success") {
      cookie.set("access_token", data.data.token, { expires: 7, path: "/" });
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
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        // const res =await sql
        try {
          const user = await login(credentials);

          return user;
        } catch (error) {
          console.log("error", error);
          throw new Error("Failed to log in");
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
    // async redirect({ baseUrl, req, res, query, resolvedUrl, params }) {
    //   // console.log('session', session)
    //   // if (session && session.user && session.user.token) {
    //   //   return baseUrl; // Redirect to the home page after successful login
    //   // }
    //   return baseUrl; // Redirect to the home page even if session information is missing
    // },
    async authorized({ auth, request: { nextUrl } }) {
      console.log("auth", auth);
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
  },
  // callbacks: {
  //   authorized({ auth, request: { nextUrl } }) {
  //     console.log('auth', auth)
  //     const isLoggedIn = !!auth?.user;
  //     const isOnDashboard = nextUrl.pathname.startsWith('/');
  //     if (isOnDashboard) {
  //       if (isLoggedIn) return true;
  //       return false; // Redirect unauthenticated users to login page
  //     } else if (isLoggedIn) {
  //       return Response.redirect(new URL('/', nextUrl));
  //     }
  //     return true;
  //   },
  // },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
