import axios from "axios";
const api = axios.create({
baseURL: "https://plagiarism-analysis-app.onrender.com",
withCredentials: true, // ✅ SEND COOKIES
});