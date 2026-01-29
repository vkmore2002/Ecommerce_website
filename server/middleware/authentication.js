import jwt from "jsonwebtoken";

const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Unauthorized! No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send("Unauthorized! Invalid token");
  }
};

const authorization = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send("Admin access required");
  }
  next();
};

export { authentication, authorization };
