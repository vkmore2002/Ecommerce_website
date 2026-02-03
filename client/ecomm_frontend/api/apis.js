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

//User Related APIs

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

//Product Related APIs
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
    console.log(err);
  }
};

const getAllProducts = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/products/products`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getProductById = async (productId) => {
  try {
    const response = await axios.get(
      `${backendUrl}/api/products/product/${productId}`,
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateProduct = async (productId, updateData, token) => {
  try {
    const response = await axios.put(
      `${backendUrl}/api/products/${productId}`,
      updateData,
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

const deleteProduct = async (productId, token) => {
  try {
    const response = await axios.delete(
      `${backendUrl}/api/products/${productId}`,
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

const addProductReview = async (productId, reviewData, token) => {
  try {
    const response = await axios.post(
      `${backendUrl}/api/products/product/${productId}/review`,
      reviewData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//Order Related APIs
const createOrder = async (orderData, token) => {
  try {
    const response = await axios.post(
      `${backendUrl}/api/orders/create`,
      orderData,
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

const getAllOrders = async (token) => {
  try {
    const response = await axios.get(`${backendUrl}/api/orders/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getUserOrders = async (token) => {
  try {
    const response = await axios.get(`${backendUrl}/api/orders/my-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getOrderById = async (orderId, token) => {
  try {
    const response = await axios.get(`${backendUrl}/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const updateOrderStatus = async (orderId, statusData, token) => {
  try {
    const response = await axios.put(
      `${backendUrl}/api/orders/${orderId}/status`,
      statusData,
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

const updatePaymentStatus = async (orderId, paymentData, token) => {
  try {
    const response = await axios.put(
      `${backendUrl}/api/orders/${orderId}/payment`,
      paymentData,
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

const deleteOrder = async (orderId, token) => {
  try {
    const response = await axios.delete(`${backendUrl}/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// Exporting all API functions
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
  getProductById,
  updateProduct,
  deleteProduct,
  addProductReview,
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  updatePaymentStatus,
  deleteOrder,
};
