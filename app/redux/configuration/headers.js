import Cookies from "js-cookie";

export function getHeaders() {
  let token;
  const zenrthAdminToken = Cookies.get("zenrthAdminToken");
  const adminToken = Cookies.get("adminToken");
  token = zenrthAdminToken ? zenrthAdminToken : adminToken;

  console.log("token", token);
  // Check if the token exists and if it's a valid JSON string
  if (token) {
    try {
      const parsedToken = JSON.parse(token);
      const authToken = parsedToken?.token_detail?.token;
      if (authToken) {
        return {
          "Content-Type": "application/json",
          // "requestId":requestId,
          Authorization: `Bearer ${authToken}`,
        };
      }
    } catch (error) {
      console.error("Error parsing userToken:", error);
    }
  } else {
    return {
      "Content-Type": "application/json",
      // requestId: requestId,
    };
  }
  return {};
}
