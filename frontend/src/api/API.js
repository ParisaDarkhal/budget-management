import axios from "axios";

export async function signup(username, password) {
  try {
    const response = await axios.post("/users/signup", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    return { error: "could not create user" };
  }
}
