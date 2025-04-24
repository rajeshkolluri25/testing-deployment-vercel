"use client";
import Cookies from "js-cookie";

// Set cookie (for admin use)
export function setAdminCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  const cookie = `${name}=${JSON.stringify(
    value
  )};expires=${expires.toUTCString()};path=/`;
  document.cookie = cookie;
}

// Get cookie value
export function getAdminCookie(name) {
  if (typeof window !== "undefined") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }
  }
  return null;
}

// Clear cookie across domains
export function clearAdminCookie(name) {
  const domains = ["talgiving.org", "talgiving-dev.vercel.app"];

  domains.forEach((domain) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${domain}; path=/;`;
  });

  // Fallback clear without domain
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Quick clear (optional shortcut)
export function clearAdminToken(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Get admin user ID from cookie
export function getAdminUserId() {
  const token = Cookies.get("zenrthAdminToken");

  if (token) {
    try {
      const parsedToken = JSON.parse(token);
      const userId = parsedToken?.unique_id;

      if (userId) return userId;
    } catch (error) {
      console.error("Error parsing admin token:", error);
    }
  }

  return null;
}
