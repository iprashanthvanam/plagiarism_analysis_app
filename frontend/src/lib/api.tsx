// import axios from "axios";
// const api = axios.create({
// baseURL: "https://plagiarism-analysis-app.onrender.com",
// withCredentials: true, // ✅ SEND COOKIES
// });









import axios from "axios";

const api = axios.create({
  baseURL: "", // ✅ Empty string = Same Domain (Relative path)
  withCredentials: true,
});

export default api;
