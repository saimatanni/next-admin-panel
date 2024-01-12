// import theme style scss file
import "styles/theme.scss";
import { Providers } from "./redux/provider";
import Provider from "./Provider";
import Loading from "./Loading";

export const metadata = {
  title: "Paymentsave partner portal",
  description:
    "Paymentsave partner portal",
  keywords:
    "Paymentsave partner portal",
};

export default function RootLayout({ children }) {
  // const session =await getServerSession()
  return (
    <html lang="en">
      <body className="bg-light">
        <Provider>
          <Providers>{children}</Providers>
        </Provider>
      </body>
    </html>
  );
}
