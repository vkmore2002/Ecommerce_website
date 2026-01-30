//this will extract details from token
import jwt from "jsonwebtoken";

const getDetailsFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
};

export default getDetailsFromToken;
