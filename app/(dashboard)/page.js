// pages/index.js
import axios from "axios";
import DashboardData from "data/dashboard/DashboardData";
// import { useSession } from "next-auth/react";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth/next";
import { authOptions } from "app/api/auth/[...nextauth]/route";

const  Home =  async () => {
  // const { data: session, status } = getServerSession()
  // const session = await getServerSession(authOptions)

 
  const session = await getServerSession(authOptions)
   console.log('user data',session);
  return <pre>{JSON.stringify(session, null, 2)}</pre>
// console.log('user token', session?.user)
// const token = await session?.user?.token
  // const users = await getUser(token);
  // const notificationList = await getNotification(token);
  return (
    <div>
      {/* <DashboardData
        data={users.data}
        notificationList={notificationList.data}
      /> */}
    </div>
  );
};
async function getUser(token) {
  console.log('token2 :>> ', token);
  // try {
  //   const headers = {
  //     Authorization: `Token ${token}`,
  //   };

  //   const response = await axios.get(
  //     `${process.env.REACT_APP_BASE_URL}api/v1/auth/dashboard/`,
  //     { headers }
  //   );

  //   if (response.status !== 200) {
  //     throw new Error(`API request failed with status ${response.status}`);
  //   }

  //   return response.data;
  // } catch (error) {
  //   console.error("Error during API call:", error);
  //   throw error;
  // }
}
async function getNotification(token) {
  try {
    const headers = {
      Authorization: `Token ${token}`,
    };

    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}api/v1/auth/notification/?offset=0&limit=10`,
      { headers }
    );

    if (response.status !== 200) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
}
export default Home;
