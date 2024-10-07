const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch All Properties
async function fetchProperties() {
  try {
    // Handle the case where the domain is not avaible yet
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(`${apiDomain}/properties`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    return data.properties;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

// Fetch Single Property
async function fetchProperty(id) {
  try {
    // Handle the case where the domain is not available yet
    if (!apiDomain) {
      console.error("API domain is not set");
      return null;
    }

    const res = await fetch(`${apiDomain}/properties/${id}`);
    console.log('Response:', res);
    
    if (!res.ok) {
      console.error("Failed response:", res.status, res.statusText);
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    return data; // Correctly return the single property object
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
}

export { fetchProperties, fetchProperty };
