import axios from "axios";

let backendUrl = "http://localhost:3000";
const checkServer = async () => {
  try {
    const data = await axios.get(backendUrl);
    console.log(data);
  } catch (err) {
    console.error("Backend server is not running");
  }
};

const userLogin = async (loginData) => {
  try {
    const response = await axios.post(
      `${backendUrl}/api/auth/login`,
      loginData,
    );
    return response.data;
  } catch (err) {
    console.error("Login failed:", err);
  }
};

const userRegister = async (registerData) => {
  try {
    const response = await axios.post(
      `${backendUrl}/api/auth/register`,
      registerData,
    );
    return response.data;
  } catch (err) {
    console.error(err.response?.data || err.message);
    throw err;
  }
};

export { checkServer, userLogin, userRegister };
