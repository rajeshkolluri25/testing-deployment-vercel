export async function getCityBounds(cityName) {
  try {
    console.log("Fetching bounds for city:", cityName);

    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_LOCATION_API_KEY; // ✅ Use env variable
    if (!API_KEY) {
      throw new Error("Google API key is missing. Check .env file.");
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        cityName
      )}&key=${API_KEY}`
    );

    const data = await response.json();
    console.log("Google API Response:", data); // Debugging

    if (data.status === "OK" && data.results.length > 0) {
      const bounds = data.results[0].geometry.viewport;
      return {
        north: bounds.northeast.lat,
        south: bounds.southwest.lat,
        east: bounds.northeast.lng,
        west: bounds.southwest.lng,
      };
    } else {
      throw new Error(
        `City not found: ${cityName}. API Status: ${data.status}`
      );
    }
  } catch (error) {
    console.error("Error fetching city bounds:", error);
    throw error;
  }
}
