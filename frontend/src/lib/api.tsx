import axios from "axios";

const api = axios.create({
  // 👇 REPLACE THIS LINE
  baseURL: "https://plagiarism-analysis-app.onrender.com", 
  // with this:
  // baseURL: "/api",

  withCredentials: true, // ✅ SEND COOKIES
});

export default api;
