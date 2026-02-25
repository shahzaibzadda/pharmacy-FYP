import jwt from "jsonwebtoken";

export const getDataFromToken = (request) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    // console.log("TOKEN_SECRET:", process.env.TOKEN_SECRET);
    // console.log("TOKEN:", token);
    return decodedToken.id;
  } catch (error) {
    throw new Error("Failed to get data from token: " + error.message);
  }
};
