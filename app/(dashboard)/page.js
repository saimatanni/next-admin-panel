// pages/index.js
import { authOptions } from "app/api/auth/[...nextauth]/route";
import axios from "axios";
import DashboardData from "data/dashboard/DashboardData";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
//dashboard
const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user) {
    redirect("/authentication/sign-in");
  }
  const token = session?.user?.token;

  const users = await getUser(token);
  const notificationList = await getNotification(token);
  return (
    <div>
      <DashboardData
        data={users.data}
        notificationList={notificationList.data}
      />
    </div>
  );
};
async function getUser(token) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const headers = {
      Authorization: `Token ${token}`,
    };

    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}api/v1/auth/dashboard/`,
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
async function getNotification(token) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
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
