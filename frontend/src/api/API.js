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

export async function getCategories() {
  try {
    const response = await axios.get("/categories");
    return response.data;
  } catch (error) {
    return { status: "error", message: "Categories not found!" };
  }
}

export async function addNewCost(categoryId, userId, month, costPrice) {
  try {
    const response = await axios.post("/costs/create", {
      category_id: categoryId,
      user_id: userId,
      month: month,
      amount: costPrice,
    });
    return response.data;
  } catch (error) {
    return { status: "error", message: "Could not create new cost" };
  }
}

export async function addNewBudget(userId, month, budget) {
  try {
    const response = await axios.post("/budget/create", {
      user_id: userId,
      month: month,
      amount: budget,
    });
    return response.data;
  } catch (error) {
    return { status: "error", message: "Could not create new cost" };
  }
}

export async function reportCostsForMonth(userId, month) {
  try {
    const response = await axios.post("/costs/report", {
      user_id: userId,
      month: month,
    });
    console.log("responseforReport :>> ", response.data);
    return response.data;
  } catch (error) {
    return { status: "error", message: "Could not create new cost" };
  }
}
