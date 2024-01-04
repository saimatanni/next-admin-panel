import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import cookie from "js-cookie";

 const login = (credentials) => async (dispatch) => {
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
    console.log("data", data);
    if (response.ok) {
      cookie.set("access_token", data.data.token, { expires: 7, path: "/" }); // Set the cookie to expire in 1 day (adjust as needed)
      // localStorage.setItem("access_token", data.data.token); // Assuming your API returns user data upon successful login
    } else {
      // dispatch(loginFailure(data.error)); // Assuming your API returns an error message upon failed login
    }
  } catch (error) {
    console.error("An error occurred during sign-in:", error);
    //   dispatch(loginFailure("An unexpected error occurred."));
  }
};
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
          console.log("cretentials", credentials);
          const user = await login(credentials);
          return user;
        } catch (error) {
          console.log("error", error);
          return null;
        }
      },
    }),
  ],
};
const handler = nextAuth(authOptions);
export { handler as GET, handler as POST };
