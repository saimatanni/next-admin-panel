"use client";
// import node module libraries
import { useEffect, useState } from "react";

// import theme style scss file
import "styles/theme.scss";

// import sub components
import NavbarVertical from "/layouts/navbars/NavbarVertical";
import NavbarTop from "/layouts/navbars/NavbarTop";
import { useSession } from "next-auth/react";
// import { SessionProvider } from "next-auth/react";

export default function DashboardLayout({ children }) {
  const [showMenu, setShowMenu] = useState(true);

  const ToggleMenu = () => {
    return setShowMenu(!showMenu);
  };
  //profile api call
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState(null);
  console.log("session", `${process.env.REACT_APP_BASE_URL}`);
  useEffect(() => {
    if (session && session?.user) {
      fetch(
        `https://partneruat-backend.paymentsave.co.uk/api/v1/auth/profile/`,
        {
          method: "GET",
          headers: {
            authorization: `Token ${session?.user?.token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => setProfile(data.data));
    }
  }, [session]);
  console.log("profile", profile);
  return (
    // <SessionProvider>
    <div id="db-wrapper" className={`${showMenu ? "" : "toggled"}`}>
      <div className="navbar-vertical navbar">
        <NavbarVertical
          showMenu={showMenu}
          onClick={(value) => setShowMenu(value)}
          profile={profile}
        />
      </div>
      <div id="page-content">
        <div className="header">
          <NavbarTop
            data={{
              showMenu: showMenu,
              SidebarToggleMenu: ToggleMenu,
            }}
          />
        </div>
        {children}
      </div>
    </div>
    // </SessionProvider>
  );
}
