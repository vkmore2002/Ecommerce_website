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

const getUserDetails = async (token) => {
  try {
    const response = await axios.get(`${backendUrl}/api/users/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Failed to fetch user details:", err);
  }
};

//to create new product
const createProduct = async (productData, token) => {
  try {
    const response = await axios.post(
      `${backendUrl}/api/products/create`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.error("Failed to create product:", err);
    throw err;
  }
};

const getAllProducts = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/products/get-all`);
    return response.data;
  } catch (err) {
    console.error("Failed to fetch products:", err);
  }
};

export {
  checkServer,
  userLogin,
  userRegister,
  getUserDetails,
  createProduct,
  getAllProducts,
};
