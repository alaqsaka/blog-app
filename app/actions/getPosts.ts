import { axiosInstance } from "@/lib/axiosInstance";

export default async function getPosts() {
  try {
    const posts = await axiosInstance.get("/posts");

    return posts;
  } catch (error) {
    console.error("[FETCH_POSTS]", error);
  }
}
