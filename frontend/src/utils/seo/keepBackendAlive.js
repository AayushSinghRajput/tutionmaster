const HEALTH_URL =
  process.env.REACT_APP_HEALTH_URL || "http://localhost:8000/api/health";

const pingBackend = async () => {
  try {
    const response = await fetch(HEALTH_URL, {
      method: "GET",
      cache: "no-store",
    });

    if (response.ok) {
      console.log("✅ TuitionMaster backend is alive");
    } else {
      console.warn(`⚠️ Backend health check returned ${response.status}`);
    }
  } catch (error) {
    console.warn("⚠️ Backend health check failed:", error.message);
  }
};

export const startBackendKeepAlive = () => {
  // Ping immediately when the website loads
  pingBackend();

  // Ping every 14 minutes
  const interval = setInterval(
    () => {
      pingBackend();
    },
    14 * 60 * 1000,
  );

  // Cleanup when the app is unmounted
  return () => clearInterval(interval);
};
