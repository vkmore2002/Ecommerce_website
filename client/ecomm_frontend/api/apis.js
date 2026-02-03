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
  if (!token) {
    const err = new Error("No token provided");
    err.response = { status: 401 };
    throw err;
  }
  try {
    const response = await axios.get(`${backendUrl}/api/users/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(
      "Failed to fetch user details:",
      err.response || err.message || err,
    );
    throw err;
  }
};

const getAllUsers = async (token) => {
  if (!token) {
    const err = new Error("No token provided");
    err.response = { status: 401 };
    throw err;
  }
  try {
    const response = await axios.get(`${backendUrl}/api/users/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Failed to fetch users:", err.response || err.message || err);
    throw err;
  }
};

const updateUser = async (userId, updateData, token) => {
  if (!token) {
    const err = new Error("No token provided");
    err.response = { status: 401 };
    throw err;
  }
  try {
    const response = await axios.put(
      `${backendUrl}/api/users/user/${userId}`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.error("Failed to update user:", err.response || err.message || err);
    throw err;
  }
};

const deleteUser = async (userId, token) => {
  try {
    const response = await axios.delete(
      `${backendUrl}/api/users/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.log(err);
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

const getAllProducts = async (token) => {
  try {
    const response = await axios.get(`${backendUrl}/api/products/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
  getAllUsers,
  updateUser,
  deleteUser,
};
