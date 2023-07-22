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

export async function addNewCategory(category, categoryType) {
  try {
    const response = await axios.post("/categories/create", {
      name: category,
      type: categoryType,
    });
    return response.data;
  } catch (error) {
    return { status: "error", message: "Could not create new category" };
  }
}

export async function addNewGoal(goal, goalPrice, userId) {
  try {
    const response = await axios.post("/goals/create", {
      name: goal,
      price: goalPrice,
      user_id: userId,
    });
    return response.data;
  } catch (error) {
    return { status: "error", message: "Could not create new goal" };
  }
}
