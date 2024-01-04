// pages/index.js
import axios from "axios";
import DashboardData from "data/dashboard/DashboardData";
import { cookies } from "next/headers";

const Home = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token");
console.log('token', token)
  const users = await getUser(token.value);
  const notificationList = await getNotification(token.value);
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
