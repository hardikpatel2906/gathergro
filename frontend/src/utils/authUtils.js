// Import the jsonwebtoken library
import { jwtDecode } from "jwt-decode";

// Function to extract user ID from JWT token
const getUserIdFromToken = () => {
  // Retrieve the JWT token from local storage
  const token = localStorage.getItem("authToken");

  if (token) {
    try {
      // Decode the JWT token
      const decoded = jwtDecode(token);
      // Extract and return the user ID
      return decoded._id;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }
  return null; // Return null if token is not present or decoding fails
};
const authUtils = { getUserIdFromToken };
export default authUtils;