import { axiosInstance } from "./axios.mjs";

export async function getStreamToken() {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}